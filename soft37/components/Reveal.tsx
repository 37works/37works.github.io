"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 스크롤 진입 시 페이드 + 8px 상승으로 "조용히 안착"하는 등장 모션 (§9).
 * 튕김 없음, ease-out. delay 로 카드 스태거. prefers-reduced-motion 존중.
 * 초기 숨김은 CSS(.reveal)에서, JS 비활성 시엔 layout 의 <noscript> 로 복구한다.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    // Reveal once the element reaches the lower 90% of the viewport.
    const inView = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 0.9 && r.bottom > 0;
    };

    let done = false;
    const cleanup = () => {
      if (done) return;
      done = true;
      io.disconnect();
      window.removeEventListener("scroll", check, { capture: false });
      window.removeEventListener("resize", check);
    };
    const check = () => {
      if (inView()) {
        setShown(true);
        cleanup();
      }
    };

    // IntersectionObserver is the primary trigger; a scroll/resize fallback
    // guarantees content is never stuck hidden if IO misses its callback.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          cleanup();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    check(); // already in view on mount?
    return cleanup;
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
