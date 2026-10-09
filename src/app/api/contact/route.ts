import { site } from "../../../content/site.ts";
import { getContactEnv } from "../../../lib/env.ts";
import { sendContactEmail } from "../../../lib/email.ts";
import { checkContactRateLimit } from "../../../lib/ratelimit.ts";
import {
  contactFieldSchema,
  contactRequestSchema,
  type ContactField,
  type ContactResult,
} from "../../../lib/validation.ts";

export const runtime = "nodejs";
export const maxDuration = 15;
const maxBytes = 16384;

export async function POST(request: Request) {
  const messages = site.contact.messages;
  const respond = (
    result: ContactResult,
    status = 200,
    headers?: HeadersInit,
  ) =>
    Response.json(result, {
      status,
      headers: { "Cache-Control": "no-store", ...headers },
    });
  try {
    const env = getContactEnv();
    if (
      request.headers.get("origin") !== new URL(env.NEXT_PUBLIC_SITE_URL).origin
    ) {
      return respond({ ok: false, error: messages.invalidRequest }, 403);
    }
    if (
      request.headers
        .get("content-type")
        ?.split(";")[0]
        .trim()
        .toLowerCase() !== "application/json"
    ) {
      return respond({ ok: false, error: messages.invalidRequest }, 415);
    }
    if (Number(request.headers.get("content-length")) > maxBytes) {
      return respond({ ok: false, error: messages.tooLarge }, 413);
    }

    let input: unknown;
    try {
      const reader = request.body?.getReader();
      if (!reader)
        return respond({ ok: false, error: messages.invalidRequest }, 400);
      const decoder = new TextDecoder();
      let body = "";
      let size = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > maxBytes) {
          await reader.cancel();
          return respond({ ok: false, error: messages.tooLarge }, 413);
        }
        body += decoder.decode(value, { stream: true });
      }
      input = JSON.parse(body + decoder.decode());
    } catch {
      return respond({ ok: false, error: messages.invalidRequest }, 400);
    }

    if (
      typeof input === "object" &&
      input !== null &&
      "website" in input &&
      typeof input.website === "string" &&
      input.website.trim()
    ) {
      return respond({ ok: true });
    }

    const limit = await checkContactRateLimit(request.headers);
    if (!limit.success) {
      return respond({ ok: false, error: messages.rateLimited }, 429, {
        "Retry-After": String(
          Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000)),
        ),
      });
    }
    const validated = contactRequestSchema.safeParse(input);
    if (!validated.success) {
      const fieldErrors: Partial<Record<ContactField, string>> = {};
      for (const issue of validated.error.issues) {
        const field = contactFieldSchema.safeParse(issue.path[0]);
        if (field.success && !fieldErrors[field.data])
          fieldErrors[field.data] = issue.message;
      }
      return respond(
        { ok: false, error: messages.invalidFields, fieldErrors },
        400,
      );
    }

    await sendContactEmail(validated.data, validated.data.submissionId);
    return respond({ ok: true });
  } catch {
    console.error("Contact submission unavailable");
    return respond({ ok: false, error: messages.unavailable }, 503);
  }
}
