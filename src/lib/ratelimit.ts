import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getContactEnv } from "./env.ts";

export async function checkContactRateLimit(headers: Headers) {
  const env = getContactEnv();
  // Only trust Vercel's overwritten client-IP header on Vercel itself.
  // Other deployments share a conservative bucket until a trusted proxy is configured.
  const forwarded =
    process.env.VERCEL === "1"
      ? headers.get("x-vercel-forwarded-for")?.split(",")[0].trim()
      : undefined;
  const identity = forwarded && isIP(forwarded) ? forwarded : "shared";
  const identifier = createHmac("sha256", env.UPSTASH_REDIS_REST_TOKEN)
    .update(identity)
    .digest("hex");
  const limiter = new Ratelimit({
    redis: new Redis({
      url: env.UPSTASH_REDIS_REST_URL,
      token: env.UPSTASH_REDIS_REST_TOKEN,
      retry: false,
      signal: () => AbortSignal.timeout(4000),
      enableAutoPipelining: false,
    }),
    limiter: Ratelimit.fixedWindow(5, "10 m"),
    prefix: "ck:contact",
    analytics: false,
    ephemeralCache: false,
    timeout: 3000,
  });
  const result = await limiter.limit(identifier);
  // Upstash's timeout response allows traffic by default; email must fail closed.
  if (result.reason === "timeout") throw new Error("Rate limiter unavailable");
  await result.pending;
  return result;
}
