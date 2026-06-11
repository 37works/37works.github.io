/**
 * 섹션 eyebrow. 앞에 round-cap Sage 틱을 두어 마크의 둥근 획 + 스파크 색 DNA를
 * 화면 곳곳에 조용히 반복한다 (디자인 시스템 §2 인식성).
 */
export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="22"
        height="6"
        viewBox="0 0 22 6"
        aria-hidden
        className="shrink-0 text-sage"
      >
        <line
          x1="3"
          y1="3"
          x2="19"
          y2="3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-caption font-medium uppercase tracking-[0.2em] text-ink-500">
        {children}
      </span>
    </span>
  );
}
