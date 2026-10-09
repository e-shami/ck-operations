import { Resend } from "resend";
import { site } from "../content/site.ts";
import { getContactEnv } from "./env.ts";
import type { ContactData } from "./validation.ts";

export async function sendContactEmail(
  data: ContactData,
  submissionId: string,
) {
  const env = getContactEnv();
  const resend = new Resend(env.RESEND_API_KEY);
  const labels = site.contact.fields;
  const { data: sent, error } = await resend.emails.send(
    {
      from: env.CONTACT_FROM_EMAIL,
      to: env.CONTACT_TO_EMAIL,
      replyTo: data.email,
      subject: site.contact.emailSubject,
      text: [
        `${labels.name}: ${data.name}`,
        `${labels.email}: ${data.email}`,
        `${labels.company}: ${data.company}`,
        `${labels.portfolioSize}: ${data.portfolioSize}`,
        "",
        `${labels.message}:`,
        data.message,
      ].join("\n"),
    },
    {
      signal: AbortSignal.timeout(8000),
      idempotencyKey: `contact/${submissionId}`,
    },
  );
  if (error || !sent?.id) throw new Error("Email delivery unavailable");
}
