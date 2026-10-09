import { z } from "zod";
import { site } from "../content/site.ts";

const messages = site.contact.validation;

export const contactSchema = z.object({
  name: z.string().trim().min(1, messages.name).max(100, messages.name),
  email: z
    .string()
    .trim()
    .max(254, messages.email)
    .pipe(z.email(messages.email)),
  company: z
    .string()
    .trim()
    .min(1, messages.company)
    .max(150, messages.company),
  portfolioSize: z
    .string()
    .trim()
    .regex(/^\d{1,9}$/, messages.portfolioSize),
  message: z
    .string()
    .trim()
    .min(1, messages.message)
    .max(4000, messages.message),
  website: z.string().max(200).default(""),
});

export const contactFieldSchema = z.enum([
  "name",
  "email",
  "company",
  "portfolioSize",
  "message",
]);
export type ContactField = z.infer<typeof contactFieldSchema>;
export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;

export const contactRequestSchema = contactSchema.extend({
  submissionId: z.uuid(),
});

export const contactResultSchema = z.discriminatedUnion("ok", [
  z.object({ ok: z.literal(true) }),
  z.object({
    ok: z.literal(false),
    error: z.string(),
    fieldErrors: z.partialRecord(contactFieldSchema, z.string()).optional(),
  }),
]);
export type ContactResult = z.infer<typeof contactResultSchema>;
