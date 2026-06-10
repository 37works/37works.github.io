import Link from "next/link";
import { ArrowUpRight, Smartphone, Sparkles, User } from "lucide-react";
import { hero, features, products, legal } from "@/content/landing";

const ICONS = {
  smartphone: Smartphone,
  sparkles: Sparkles,
  user: User,
} as const;

const SHELL = "mx-auto max-w-[1200px] px-5 md:px-16";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className={`${SHELL} py-20 md:py-32`}>
        <div className="settle max-w-3xl">
          <span className="block text-caption font-medium uppercase tracking-[0.2em] text-ink-500">
            {hero.eyebrow}
          </span>
          <h1 className="mt-6 text-display font-semibold tracking-tight text-ink-900 md:text-[56px] md:leading-[1.05]">
            {hero.title}
          </h1>
          <p className="mt-6 text-h3 font-medium text-sage-deep">
            {hero.tagline}
          </p>
          <p className="mt-6 max-w-2xl text-title leading-relaxed text-ink-700">
            {hero.description}
          </p>
        </div>
      </section>

      {/* About */}
      <section className={`${SHELL} pb-20 md:pb-24`}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((f) => {
            const Icon = ICONS[f.icon];
            return (
              <div
                key={f.title}
                className="rounded-lg border border-ink-200 bg-surface p-6 shadow-e1 transition-shadow duration-[280ms] ease-out hover:shadow-e2"
              >
                <Icon
                  size={28}
                  strokeWidth={1.75}
                  absoluteStrokeWidth
                  className="text-sage"
                />
                <h3 className="mt-6 text-h3 font-medium text-ink-900">
                  {f.title}
                </h3>
                <p className="mt-3 text-body leading-relaxed text-ink-700">
                  {f.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Products */}
      <section className="border-y border-ink-200 bg-surface/50 py-24 md:py-32">
        <div className={SHELL}>
          <span className="block text-caption font-medium uppercase tracking-[0.2em] text-ink-500">
            {products.eyebrow}
          </span>
          <h2 className="mt-6 max-w-2xl text-h1 font-semibold tracking-tight text-ink-900">
            {products.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-body text-ink-500">
            {products.note}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {products.items.map((p) => (
              <div
                key={p.id}
                className="flex flex-col rounded-lg border border-ink-200 bg-surface p-6 shadow-e1 transition-shadow duration-[280ms] ease-out hover:shadow-e2"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-caption font-medium uppercase tracking-[0.16em] text-ink-500">
                      {p.category}
                    </p>
                    <h3 className="mt-1 text-h3 font-medium text-ink-900">
                      {p.name}
                    </h3>
                  </div>
                  {p.comingSoon && (
                    <span className="shrink-0 rounded-full border border-sage-tint bg-sage-wash px-3 py-1 text-caption font-medium text-sage-deep">
                      {p.releaseNote}
                    </span>
                  )}
                </div>
                <p className="mt-3 flex-1 text-body leading-relaxed text-ink-700">
                  {p.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.platforms.map((pl) => (
                    <span
                      key={pl}
                      className="rounded-xs border border-ink-200 bg-ink-100 px-2 py-1 text-caption font-medium uppercase tracking-wide text-ink-500"
                    >
                      {pl}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal */}
      <section className={`${SHELL} py-20 md:py-24`}>
        <span className="block text-caption font-medium uppercase tracking-[0.2em] text-ink-500">
          {legal.eyebrow}
        </span>
        <h2 className="mt-6 text-h2 font-semibold tracking-tight text-ink-900">
          {legal.heading}
        </h2>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          {legal.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-1 items-center gap-4 rounded-lg border border-ink-200 bg-surface p-6 transition-colors duration-200 ease-out hover:border-ink-300 hover:bg-ink-100"
            >
              <div className="flex-1">
                <p className="text-caption uppercase tracking-widest text-ink-500">
                  {item.caption}
                </p>
                <p className="mt-1 text-title font-medium text-ink-900">
                  {item.label}
                </p>
              </div>
              <ArrowUpRight
                size={18}
                strokeWidth={1.75}
                absoluteStrokeWidth
                className="text-ink-500 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
              />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
