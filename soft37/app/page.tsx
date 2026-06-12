import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ShieldCheck, Sparkles, User } from "lucide-react";
import { hero, features, products, legal, site } from "@/content/landing";
import { Eyebrow } from "@/components/Eyebrow";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";

const ICONS = {
  shield: ShieldCheck,
  sparkles: Sparkles,
  user: User,
} as const;

const SHELL = "mx-auto max-w-[1200px] px-5 md:px-16";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className={`${SHELL} py-20 md:py-32`}>
        <div className="grid items-center gap-12 md:grid-cols-[1fr_auto] md:gap-20">
          <div className="settle max-w-2xl">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 className="mt-6 text-display tracking-tight text-ink-900 md:text-[64px] md:leading-[1.04]">
              {hero.title}
            </h1>
            <p className="mt-5 text-h2 font-semibold tracking-tight text-blue">
              {hero.tagline}
            </p>
            <p className="mt-6 max-w-xl text-title font-normal leading-relaxed text-ink-700">
              {hero.description}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#products"
                className="rounded-md bg-blue px-6 py-2.5 text-label font-medium text-white transition-colors duration-200 ease-out hover:bg-blue-deep"
              >
                제품 보기
              </a>
              <a
                href={`mailto:${site.contactEmail}`}
                className="rounded-md border border-ink-200 bg-surface px-6 py-2.5 text-label font-medium text-ink-900 transition-colors duration-200 ease-out hover:border-ink-300"
              >
                문의하기
              </a>
            </div>
          </div>

          {/* 시그니처 ㅅㅊ 마크 — 브랜드 앵커 */}
          <div className="settle hidden shrink-0 justify-self-end md:block">
            <div className="p-14">
              <Logo size={224} />
            </div>
          </div>
        </div>
      </section>

      {/* Products — 서비스가 주인공 */}
      <section id="products" className={`${SHELL} scroll-mt-24 pb-24 md:pb-32`}>
        <Reveal>
          <Eyebrow>{products.eyebrow}</Eyebrow>
          <h2 className="mt-6 max-w-2xl text-h1 tracking-tight text-ink-900">
            {products.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-body text-ink-500">
            {products.note}
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {products.items.map((p, i) => {
            const cardClass =
              "group flex h-full flex-col overflow-hidden rounded-lg border border-ink-200 bg-surface shadow-e1 transition-[box-shadow,transform,border-color] duration-280 ease-out hover:-translate-y-1 hover:border-ink-300 hover:shadow-e2";
            const inner = (
              <>
                {/* 가로형 OG 배너 — 서비스 로고가 카드의 주인공 */}
                <div className="relative aspect-[1200/630] w-full border-b border-ink-200 bg-white">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 768px) 588px, 100vw"
                    className="object-contain p-6 transition-transform duration-280 ease-out group-hover:scale-[1.02]"
                  />
                  {p.comingSoon && (
                    <span className="absolute right-4 top-4 rounded-full bg-blue-tint px-3 py-1 text-caption font-medium text-blue-deep">
                      {p.releaseNote}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <p className="text-caption font-medium uppercase tracking-[0.16em] text-ink-500">
                    {p.category}
                  </p>
                  <p className="mt-3 flex-1 text-body leading-relaxed text-ink-700">
                    {p.description}
                  </p>
                  <div className="mt-7 flex flex-wrap items-center justify-between gap-2 border-t border-ink-200 pt-5">
                    <div className="flex flex-wrap gap-2">
                      {p.platforms.map((pl) => (
                        <span
                          key={pl}
                          className="rounded-xs bg-ink-100 px-2 py-1 text-caption font-medium uppercase tracking-wide text-ink-700"
                        >
                          {pl}
                        </span>
                      ))}
                    </div>
                    {p.url && (
                      <span className="inline-flex items-center gap-1 text-body-sm font-medium text-ink-500 transition-colors duration-200 ease-out group-hover:text-blue">
                        방문하기
                        <ArrowUpRight
                          size={16}
                          strokeWidth={1.75}
                          absoluteStrokeWidth
                          className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                    )}
                  </div>
                </div>
              </>
            );
            return (
              <Reveal key={p.id} delay={i * 80}>
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className={cardClass}>{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Approach */}
      <section className="border-y border-ink-200 bg-surface py-24 md:py-28">
        <div className={SHELL}>
          <Reveal>
            <Eyebrow>Approach</Eyebrow>
            <h2 className="mt-6 max-w-2xl text-h1 tracking-tight text-ink-900">
              작게, 정확하게, 부드럽게.
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {features.map((f, i) => {
              const Icon = ICONS[f.icon];
              return (
                <Reveal key={f.title} delay={i * 80}>
                  <div className="border-t border-ink-200 pt-6">
                    <Icon
                      size={24}
                      strokeWidth={1.75}
                      absoluteStrokeWidth
                      className="text-blue"
                    />
                    <h3 className="mt-5 text-h3 text-ink-900">{f.title}</h3>
                    <p className="mt-3 text-body leading-relaxed text-ink-700">
                      {f.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Legal */}
      <section className={`${SHELL} py-20 md:py-24`}>
        <Reveal>
          <Eyebrow>{legal.eyebrow}</Eyebrow>
          <h2 className="mt-6 text-h2 tracking-tight text-ink-900">
            {legal.heading}
          </h2>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            {legal.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-1 items-center gap-4 rounded-lg border border-ink-200 bg-surface p-6 transition-[border-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-ink-300"
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
                  className="text-ink-500 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue"
                />
              </Link>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
