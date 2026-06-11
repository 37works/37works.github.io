"use client";

import { useEffect, useRef, useState } from "react";
import type { LegalDoc as LegalDocData } from "@/content/types";

const APP_NAME_RE = /\{APP_NAME\}/g;

export function LegalDoc({
  doc,
  appName,
}: {
  doc: LegalDocData;
  appName: string;
}) {
  const [active, setActive] = useState(doc.sections[0]?.id ?? "");
  const navRef = useRef<HTMLElement>(null);

  // scroll-spy: highlight the language section currently in view
  useEffect(() => {
    // detection band just below the sticky header/nav. Track which sections
    // overlap the band, then pick the first in document order — robust for
    // very tall sections and exact boundary landings.
    const visible = new Set<string>();
    const order = doc.sections.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const next = order.find((id) => visible.has(id));
        if (next) setActive(next);
      },
      { threshold: 0, rootMargin: "-120px 0px -75% 0px" }
    );
    for (const s of doc.sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [doc.sections]);

  // keep the active chip visible in the horizontally-scrolling nav
  useEffect(() => {
    const link = navRef.current?.querySelector<HTMLElement>(
      `a[data-lang="${active}"]`
    );
    link?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  const title = `${appName} — ${doc.title}`;

  return (
    <>
      {/* page header */}
      <header className="border-b border-ink-200 bg-surface px-5 py-12 text-center md:py-14">
        <div className="text-caption font-semibold uppercase tracking-[0.12em] text-ink-500">
          Legal Document · {doc.title}
        </div>
        <h1 className="mt-3 text-h1 font-semibold tracking-tight text-ink-900">
          {title}
        </h1>
        <p className="mt-2 text-body-sm text-ink-500">
          Effective Date: <strong className="text-ink-700">{doc.effectiveDate}</strong>
          {"  ·  "}
          Developer: <strong className="text-ink-700">{doc.developer}</strong>
          {"  ·  "}
          <a
            href={`mailto:${doc.contactEmail}`}
            className="text-blue hover:text-blue-deep"
          >
            {doc.contactEmail}
          </a>
        </p>
      </header>

      {/* sticky language nav */}
      <nav
        ref={navRef}
        aria-label="Language navigation"
        className="sticky top-[69px] z-40 flex gap-1 overflow-x-auto border-b border-ink-200 bg-canvas/90 px-5 py-2.5 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="mx-auto flex gap-1">
          {doc.sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              data-lang={s.id}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-body-sm font-medium transition-colors duration-200 ease-out ${
                active === s.id
                  ? "border-blue-tint bg-blue-wash text-blue"
                  : "border-transparent text-ink-500 hover:bg-ink-100 hover:text-ink-700"
              }`}
            >
              <span aria-hidden>{s.flag}</span>
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      {/* sections */}
      <div className="mx-auto max-w-[800px] px-4 pb-24">
        {doc.sections.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className="mt-11 scroll-mt-32 overflow-hidden rounded-lg border border-ink-200 bg-surface"
          >
            <div className="flex items-center gap-2.5 border-b border-ink-200 bg-blue-wash px-7 py-4">
              <span className="shrink-0 rounded-xs bg-blue px-2 py-0.5 text-caption font-semibold tracking-wider text-white">
                {s.badge}
              </span>
              <span className="text-body font-medium text-blue-deep">
                {s.label}
              </span>
            </div>
            <div
              className="prose px-7 py-8"
              dangerouslySetInnerHTML={{
                __html: s.html.replace(APP_NAME_RE, appName),
              }}
            />
          </section>
        ))}
      </div>
    </>
  );
}
