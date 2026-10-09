// Reserved domains and deliberately fake credentials. Never used for live delivery.
export const testContactEnv = {
  RESEND_API_KEY: "re_test_not_a_real_key",
  CONTACT_TO_EMAIL: "private-inbox@example.invalid",
  CONTACT_FROM_EMAIL: "sender@example.invalid",
  UPSTASH_REDIS_REST_URL: "https://redis.example.invalid",
  UPSTASH_REDIS_REST_TOKEN: "test_not_a_real_redis_token",
  NEXT_PUBLIC_CONTACT_EMAIL: "contact@example.invalid",
  NEXT_PUBLIC_SITE_URL: "http://127.0.0.1:3100",
};
