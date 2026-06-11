/**
 * 공식 ㅅㅊ 마크 (디자인 시스템 §2 정본). 토큰 컬러로 렌더해 다크 모드에 호응.
 * `draw` 가 true면 "한 획" 으로 흐르듯 그려지고 Sage 스파크가 뒤이어 안착한다.
 * 색·곡률·round cap 은 정본을 그대로 따른다 (임의 변형 금지).
 */
export function MarkGlyph({
  size = 120,
  draw = false,
  className = "",
}: {
  size?: number;
  draw?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 470 300"
      width={size}
      height={(size * 300) / 470}
      className={className}
      role="img"
      aria-label="Soft37"
    >
      {/* ㅅ : 직선 왼다리 + 오른쪽 루프 (한 획) */}
      <path
        d="M 95 235 L 190 65 C 235 150 280 195 305 212 C 320 224 342 226 358 214 C 376 200 378 174 362 160 C 348 148 324 150 316 166 C 310 178 318 190 332 190"
        fill="none"
        stroke="var(--ink-900)"
        strokeWidth={22}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={draw ? 1 : undefined}
        className={draw ? "mark-stroke" : undefined}
      />
      {/* ㅊ : Sage 스파크 */}
      <g stroke="var(--sage)" strokeWidth={11} strokeLinecap="round">
        <line
          x1="375"
          y1="82"
          x2="375"
          y2="138"
          pathLength={draw ? 1 : undefined}
          className={draw ? "spark-line" : undefined}
        />
        <line
          x1="361"
          y1="86"
          x2="389"
          y2="134"
          pathLength={draw ? 1 : undefined}
          className={draw ? "spark-line" : undefined}
        />
        <line
          x1="389"
          y1="86"
          x2="361"
          y2="134"
          pathLength={draw ? 1 : undefined}
          className={draw ? "spark-line" : undefined}
        />
      </g>
    </svg>
  );
}
