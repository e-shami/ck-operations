"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import {
  contactFieldSchema,
  contactResultSchema,
  contactSchema,
  type ContactData,
  type ContactInput,
  type ContactResult,
} from "@/lib/validation";

export function ContactForm({ contactEmail }: { contactEmail: string }) {
  const copy = site.contact;
  const [result, setResult] = useState<ContactResult | null>(null);
  const [ready, setReady] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const submittingRef = useRef(false);
  const submissionRef = useRef<{ payload: string; id: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput, unknown, ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      portfolioSize: "",
      message: "",
      website: "",
    },
  });

  useEffect(() => setReady(true), []);

  useEffect(() => {
    if (result?.ok) successRef.current?.focus();
    if (result && !result.ok && result.fieldErrors && !isSubmitting) {
      const first = contactFieldSchema.options.find(
        (field) => result.fieldErrors?.[field],
      );
      if (first) setFocus(first);
    }
  }, [result, isSubmitting, setFocus]);

  async function submit(values: ContactData) {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setResult(null);
    try {
      const payload = JSON.stringify(values);
      if (submissionRef.current?.payload !== payload) {
        submissionRef.current = { payload, id: crypto.randomUUID() };
      }
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          submissionId: submissionRef.current.id,
        }),
        signal: AbortSignal.timeout(20000),
      });
      const parsed = contactResultSchema.safeParse(await response.json());
      if (!parsed.success || (parsed.data.ok && !response.ok))
        throw new Error("Invalid response");
      const outcome = parsed.data;
      setResult(outcome);
      if (outcome.ok) {
        submissionRef.current = null;
        reset();
      } else if (outcome.fieldErrors) {
        for (const [key, message] of Object.entries(outcome.fieldErrors)) {
          const field = contactFieldSchema.safeParse(key);
          if (field.success && message) {
            setError(field.data, { type: "server", message });
          }
        }
      }
    } catch {
      setResult({ ok: false, error: copy.messages.unavailable });
    } finally {
      submittingRef.current = false;
    }
  }

  const inputClass =
    "mt-2 min-h-11 w-full rounded-control border border-slate-600 bg-white px-3 py-3 text-body text-ink-900 focus:border-brand-600 aria-[invalid=true]:border-danger-600";
  return (
    <div className="rounded-card border border-slate-200 bg-sky-50 p-6 shadow-card md:p-8">
      {result?.ok ? (
        <div
          ref={successRef}
          tabIndex={-1}
          role="status"
          className="rounded-control bg-sky-100 p-6 text-brand-950"
        >
          <h3 className="font-heading text-subheading-mobile md:text-subheading">
            {copy.successTitle}
          </h3>
          <p className="mt-3">{copy.successDetail}</p>
          <Button
            className="mt-6"
            onClick={() => {
              setResult(null);
              requestAnimationFrame(() => setFocus("name"));
            }}
          >
            {copy.sendAnother}
          </Button>
        </div>
      ) : (
        <form
          method="post"
          action="/api/contact"
          noValidate
          onSubmit={handleSubmit(submit)}
          aria-busy={isSubmitting}
          aria-label={copy.heading}
        >
          <p className="mb-6 text-caption text-slate-600">{copy.required}</p>
          <fieldset
            disabled={isSubmitting}
            className="grid min-w-0 gap-6 sm:grid-cols-2"
          >
            {(["name", "email", "company", "portfolioSize"] as const).map(
              (field) => (
                <div key={field} className="min-w-0">
                  <label
                    htmlFor={`contact-${field}`}
                    className="text-caption font-semibold text-ink-900"
                  >
                    {copy.fields[field]}
                  </label>
                  <input
                    {...register(field)}
                    id={`contact-${field}`}
                    type={field === "email" ? "email" : "text"}
                    inputMode={
                      field === "portfolioSize" ? "numeric" : undefined
                    }
                    autoComplete={
                      {
                        name: "name",
                        email: "email",
                        company: "organization",
                        portfolioSize: "off",
                      }[field]
                    }
                    maxLength={
                      { name: 100, email: 254, company: 150, portfolioSize: 9 }[
                        field
                      ]
                    }
                    required
                    aria-invalid={!!errors[field]}
                    aria-describedby={
                      errors[field] ? `contact-${field}-error` : undefined
                    }
                    className={inputClass}
                  />
                  {errors[field] && (
                    <p
                      id={`contact-${field}-error`}
                      role="alert"
                      className="mt-2 text-caption text-danger-600"
                    >
                      {errors[field]?.message}
                    </p>
                  )}
                </div>
              ),
            )}
            <div className="sm:col-span-2">
              <label
                htmlFor="contact-message"
                className="text-caption font-semibold text-ink-900"
              >
                {copy.fields.message}
              </label>
              <textarea
                {...register("message")}
                id="contact-message"
                required
                rows={5}
                maxLength={4000}
                aria-invalid={!!errors.message}
                aria-describedby={`contact-message-help${errors.message ? " contact-message-error" : ""}`}
                className={`${inputClass} resize-y`}
              />
              <p
                id="contact-message-help"
                className="mt-2 text-caption text-slate-600"
              >
                {copy.sensitiveInfo}
              </p>
              {errors.message && (
                <p
                  id="contact-message-error"
                  role="alert"
                  className="mt-2 text-caption text-danger-600"
                >
                  {errors.message.message}
                </p>
              )}
            </div>
            <div hidden aria-hidden="true">
              <label htmlFor="contact-website">{copy.fields.website}</label>
              <input
                {...register("website")}
                id="contact-website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <Button
              type="submit"
              disabled={!ready || isSubmitting}
              className="sm:col-span-2"
            >
              {isSubmitting ? copy.submitting : copy.submit}
            </Button>
          </fieldset>
          {result && !result.ok && (
            <div role="alert" className="mt-6 text-danger-600">
              <p>{result.error}</p>
              <p className="mt-2 text-ink-900">
                {copy.fallback}{" "}
                <a
                  className="break-all rounded-control text-brand-700 underline underline-offset-4"
                  href={`mailto:${contactEmail}`}
                >
                  {contactEmail}
                </a>
                .
              </p>
            </div>
          )}
          <noscript>
            <p className="mt-6 text-ink-900">{copy.noScript}</p>
          </noscript>
        </form>
      )}
    </div>
  );
}
