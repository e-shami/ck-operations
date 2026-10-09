import { env } from "node:process";
import { z } from "zod";

const contactEnvSchema = z.object({
  RESEND_API_KEY: z.string().trim().startsWith("re_").min(8),
  CONTACT_TO_EMAIL: z.email(),
  CONTACT_FROM_EMAIL: z.email(),
  UPSTASH_REDIS_REST_URL: z.url({ protocol: /^https$/ }),
  UPSTASH_REDIS_REST_TOKEN: z.string().trim().min(1),
  NEXT_PUBLIC_CONTACT_EMAIL: z.email(),
  NEXT_PUBLIC_SITE_URL: z.url().refine((value) => {
    if (!URL.canParse(value)) return false;
    const url = new URL(value);
    return (
      !url.username &&
      !url.password &&
      url.pathname === "/" &&
      !url.search &&
      !url.hash &&
      (url.protocol === "https:" ||
        (url.protocol === "http:" &&
          ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)))
    );
  }),
});

export function getContactEnv() {
  const result = contactEnvSchema.safeParse(env);
  if (!result.success) {
    const names = [
      ...new Set(result.error.issues.map((issue) => issue.path[0])),
    ].join(", ");
    throw new Error(
      `Missing or invalid contact configuration: ${names}. See .env.example.`,
    );
  }
  return result.data;
}
