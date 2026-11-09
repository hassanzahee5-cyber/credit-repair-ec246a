const MIN = 300
const MAX = 850

/** Semicircle FICO-style gauge (300–850). Purely illustrative. */
export function ScoreGauge({ score, label }: { score: number; label: string }) {
  const r = 80
  const length = Math.PI * r
  const pct = (Math.min(Math.max(score, MIN), MAX) - MIN) / (MAX - MIN)
  const offset = length * (1 - pct)
  return (
    <svg viewBox="0 0 200 120" role="img" aria-label={`${label}: ${score}`}>
      <path
        d="M20 100 A80 80 0 0 1 180 100"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.12"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        className="gauge-arc"
        d="M20 100 A80 80 0 0 1 180 100"
        fill="none"
        stroke="var(--color-lime)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray={length}
        strokeDashoffset={offset}
        style={{ '--dash-from': length } as React.CSSProperties}
      />
      <text
        x="100"
        y="88"
        textAnchor="middle"
        className="font-display"
        fontSize="36"
        fill="currentColor"
      >
        {score}
      </text>
      <text
        x="100"
        y="108"
        textAnchor="middle"
        fontSize="9"
        letterSpacing="1.5"
        fill="currentColor"
        fillOpacity="0.6"
      >
        {label.toUpperCase()}
      </text>
    </svg>
  )
}
