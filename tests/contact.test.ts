import assert from "node:assert/strict";
import { afterEach, beforeEach, mock, test } from "node:test";
import { POST } from "../src/app/api/contact/route.ts";
import { contactSchema } from "../src/lib/validation.ts";
import { getContactEnv } from "../src/lib/env.ts";
import { site } from "../src/content/site.ts";
import { testContactEnv } from "./fixtures/contactEnv.ts";

const originalEnv = { ...process.env };
const valid = {
  name: "Test Person",
  email: "visitor@example.invalid",
  company: "Test Company",
  portfolioSize: "120",
  message: "Please discuss our operations.",
  website: "",
  submissionId: "00000000-0000-4000-8000-000000000001",
};
let sent: Record<string, unknown>[];
let redisKeys: string[];
let requests: string[];
let idempotencyKeys: (string | null)[];
let redisCount = 0;
let redisUnavailable = false;
let emailUnavailable = false;

beforeEach(() => {
  Object.assign(process.env, testContactEnv);
  delete process.env.VERCEL;
  sent = [];
  redisKeys = [];
  requests = [];
  idempotencyKeys = [];
  redisCount = 0;
  redisUnavailable = false;
  emailUnavailable = false;
  mock.method(
    globalThis,
    "fetch",
    async (input: string | URL | Request, init?: RequestInit) => {
      const url = String(input);
      requests.push(url);
      if (url.startsWith(testContactEnv.UPSTASH_REDIS_REST_URL)) {
        if (redisUnavailable)
          throw new Error("provider-secret-should-not-leak");
        const command = JSON.parse(String(init?.body));
        redisKeys.push(JSON.stringify(command));
        return Response.json({ result: [++redisCount, 5] });
      }
      if (url === "https://api.resend.com/emails") {
        sent.push(JSON.parse(String(init?.body)));
        idempotencyKeys.push(new Headers(init?.headers).get("idempotency-key"));
        if (emailUnavailable)
          return Response.json(
            {
              name: "validation_error",
              message: "provider-secret-should-not-leak",
            },
            { status: 403 },
          );
        return Response.json({ id: "mock-email-id" });
      }
      throw new Error(`Unexpected network request: ${url}`);
    },
  );
  mock.method(console, "error", () => {});
});

afterEach(() => {
  mock.restoreAll();
  for (const key of [...Object.keys(testContactEnv), "VERCEL"]) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});

function request(body: unknown = valid, headers: Record<string, string> = {}) {
  return new Request("http://127.0.0.1:3100/api/contact", {
    method: "POST",
    headers: {
      origin: testContactEnv.NEXT_PUBLIC_SITE_URL,
      "content-type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

test("shared schema trims fields and accepts a zero-property portfolio", () => {
  const result = contactSchema.parse({
    ...valid,
    name: " Test Person ",
    portfolioSize: "0",
  });
  assert.equal(result.name, "Test Person");
  assert.equal(result.portfolioSize, "0");
  for (const [field, value] of [
    ["name", " "],
    ["email", "not-email"],
    ["company", ""],
    ["portfolioSize", "-1"],
    ["portfolioSize", "2.5"],
    ["portfolioSize", "1e3"],
    ["message", "x".repeat(4001)],
  ]) {
    assert.equal(
      contactSchema.safeParse({ ...valid, [field]: value }).success,
      false,
    );
  }
});

test("valid submission sends plain text to fixed inbox with visitor Reply-To", async () => {
  const response = await POST(
    request({ ...valid, message: "<script>alert('not HTML')</script>" }),
  );
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(sent.length, 1);
  assert.equal(sent[0].to, testContactEnv.CONTACT_TO_EMAIL);
  assert.equal(sent[0].from, testContactEnv.CONTACT_FROM_EMAIL);
  assert.equal(sent[0].reply_to, valid.email);
  assert.equal(sent[0].subject, site.contact.emailSubject);
  assert.equal("html" in sent[0], false);
  assert.match(String(sent[0].text), /<script>/);
});

test("invalid input is rejected on the server and never emailed", async () => {
  const response = await POST(
    request({ ...valid, email: "bad", message: " " }),
  );
  assert.equal(response.status, 400);
  const result = await response.json();
  assert.equal(result.ok, false);
  assert.equal(result.fieldErrors.email, site.contact.validation.email);
  assert.equal(result.fieldErrors.message, site.contact.validation.message);
  assert.equal(sent.length, 0);
});

test("honeypot returns fake success without touching either provider", async () => {
  const response = await POST(request({ website: "spam.invalid" }));
  assert.deepEqual(await response.json(), { ok: true });
  assert.deepEqual(requests, []);
});

test("sixth request is rate limited with Retry-After", async () => {
  for (let i = 0; i < 5; i++) assert.equal((await POST(request())).status, 200);
  const response = await POST(request());
  assert.equal(response.status, 429);
  assert.ok(Number(response.headers.get("retry-after")) > 0);
  assert.equal(sent.length, 5);
});

test("rate-limit failure fails closed without sending email or exposing provider errors", async () => {
  redisUnavailable = true;
  const response = await POST(request());
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    ok: false,
    error: site.contact.messages.unavailable,
  });
  assert.equal(sent.length, 0);
});

test("email failure returns safe error rather than success", async () => {
  emailUnavailable = true;
  const response = await POST(request());
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    ok: false,
    error: site.contact.messages.unavailable,
  });
});

test("retry of the same submission retains the provider idempotency key", async () => {
  emailUnavailable = true;
  assert.equal((await POST(request())).status, 503);
  emailUnavailable = false;
  assert.equal((await POST(request())).status, 200);
  assert.deepEqual(idempotencyKeys, [
    `contact/${valid.submissionId}`,
    `contact/${valid.submissionId}`,
  ]);
});

test("malformed idempotency IDs are not forwarded to email", async () => {
  assert.equal(
    (await POST(request({ ...valid, submissionId: "bad-id" }))).status,
    400,
  );
  assert.equal(sent.length, 0);
});

test("rate-limit timeout fails closed even when the SDK would allow traffic", async () => {
  mock.method(globalThis, "fetch", async () => {
    await new Promise((resolve) => setTimeout(resolve, 3100));
    return Response.json({ result: [1, 5] });
  });
  const response = await POST(request());
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    ok: false,
    error: site.contact.messages.unavailable,
  });
  assert.equal(sent.length, 0);
});

test("cross-origin requests and unsupported content types do not call providers", async () => {
  assert.equal(
    (await POST(request(valid, { origin: "https://attacker.invalid" }))).status,
    403,
  );
  assert.equal(
    (await POST(request(valid, { "content-type": "text/plain" }))).status,
    415,
  );
  assert.deepEqual(requests, []);
});

test("malformed JSON and oversized bodies are rejected before providers", async () => {
  const malformed = new Request("http://127.0.0.1:3100/api/contact", {
    method: "POST",
    headers: {
      origin: testContactEnv.NEXT_PUBLIC_SITE_URL,
      "content-type": "application/json",
    },
    body: "{",
  });
  assert.equal((await POST(malformed)).status, 400);
  assert.equal(
    (await POST(request({ message: "x".repeat(17000) }))).status,
    413,
  );
  assert.equal(
    (await POST(request(valid, { "content-length": "17000" }))).status,
    413,
  );
  assert.deepEqual(requests, []);
});

test("spoofed forwarding headers do not change the shared bucket off Vercel", async () => {
  await POST(
    request(valid, {
      "x-forwarded-for": "192.0.2.1",
      "x-vercel-forwarded-for": "192.0.2.1",
    }),
  );
  await POST(
    request(valid, {
      "x-forwarded-for": "192.0.2.2",
      "x-vercel-forwarded-for": "192.0.2.2",
    }),
  );
  assert.equal(redisKeys[0], redisKeys[1]);
  assert.ok(redisKeys.every((key) => !key.includes("192.0.2.")));
});

test("trusted Vercel client addresses get distinct hashed buckets", async () => {
  process.env.VERCEL = "1";
  await POST(request(valid, { "x-vercel-forwarded-for": "192.0.2.1" }));
  await POST(request(valid, { "x-vercel-forwarded-for": "192.0.2.2" }));
  assert.notEqual(redisKeys[0], redisKeys[1]);
  assert.ok(redisKeys.every((key) => !key.includes("192.0.2.")));
});

test("missing and malformed environment values report variable names only", () => {
  delete process.env.RESEND_API_KEY;
  assert.throws(getContactEnv, /RESEND_API_KEY/);
  process.env.RESEND_API_KEY = testContactEnv.RESEND_API_KEY;
  process.env.NEXT_PUBLIC_SITE_URL = "not-a-url";
  process.env.UPSTASH_REDIS_REST_URL = "not-a-url";
  assert.throws(getContactEnv, /UPSTASH_REDIS_REST_URL.*NEXT_PUBLIC_SITE_URL/);
});
