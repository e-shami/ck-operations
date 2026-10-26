"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { site } from "@/content/site";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export function Team() {
  const { team } = site;
  const [paused, setPaused] = useState(false);

  return (
    <Section
      id="team"
      tone="tinted"
      aria-labelledby="team-heading"
      tabIndex={-1}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-prose">
          <p className="mb-4 text-eyebrow-mobile uppercase text-brand-700 md:text-eyebrow">
            {team.eyebrow}
          </p>
          <Heading id="team-heading" className="text-balance">
            {team.headline}
          </Heading>
          <p className="mt-6 text-body-large-mobile text-slate-600 md:text-body-large">
            {team.description}
          </p>
        </div>
        <button
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
          className="inline-flex min-h-11 shrink-0 items-center justify-center self-start rounded-control border border-brand-700 px-4 text-caption font-semibold text-brand-700 hover:bg-white motion-reduce:hidden md:self-auto"
        >
          {paused ? "Resume carousel" : "Pause carousel"}
        </button>
      </div>

      <div className="group relative mt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-sky-50 to-transparent md:w-24"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-sky-50 to-transparent md:w-24"
        />
        <div className="overflow-hidden motion-reduce:overflow-x-auto">
          <div
            className="flex w-max motion-safe:animate-marquee group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused]"
            style={paused ? { animationPlayState: "paused" } : undefined}
          >
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 || undefined}
                className={`flex shrink-0 ${copy === 1 ? "motion-reduce:hidden" : ""}`}
              >
                {team.members.map((member) => (
                  <li
                    key={member.name}
                    className="mr-5 w-72 shrink-0 sm:w-80 md:mr-6"
                  >
                    <article className="h-full rounded-card border border-slate-200 bg-white p-6 shadow-card">
                      <span
                        aria-hidden="true"
                        className="flex size-14 items-center justify-center rounded-full bg-sky-100 font-heading text-subheading text-brand-700"
                      >
                        {initials(member.name)}
                      </span>
                      <h3 className="mt-5 font-heading text-subheading-mobile md:text-subheading">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-caption font-semibold uppercase text-brand-700">
                        {member.role}
                      </p>
                      <p className="mt-4 text-slate-600">{member.focus}</p>
                    </article>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-6 text-caption text-slate-600">{team.note}</p>
    </Section>
  );
}
