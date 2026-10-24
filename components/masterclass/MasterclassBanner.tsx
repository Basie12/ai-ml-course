import { safeHref } from "@/lib/masterclasses";

/** Banner image, or a branded generated artwork when no banner is set. */
export function MasterclassBanner({ url, title, className = "" }: { url: string; title: string; className?: string }) {
  const src = safeHref(url);
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={`mc-banner ${className}`} src={src} alt="" loading="lazy" />;
  }
  // Deterministic variant from the title so each event looks a little different.
  const seed = Array.from(title).reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const variant = seed % 3;
  return (
    <div className={`mc-banner mc-banner-art v${variant} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`mcg${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#497BFF" />
            <stop offset="1" stopColor="#9461FF" />
          </linearGradient>
        </defs>
        <g fill="none" stroke={`url(#mcg${variant})`} strokeWidth="1.4" opacity=".75">
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={`M-20 ${150 - i * 18} C 90 ${60 + i * 14}, 220 ${210 - i * 22}, 420 ${90 + i * 10}`} />
          ))}
        </g>
        {[[70, 120], [150, 88], [232, 140], [310, 96], [350, 160]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="9" fill="#25E6D3" opacity=".18" />
            <circle cx={x} cy={y} r="3.4" fill={i % 2 ? "#25E6D3" : "#A784FF"} />
          </g>
        ))}
        <text x="24" y="176" fill="#C3CCE3" fontFamily="ui-monospace, monospace" fontSize="12" letterSpacing="2">
          {"LIVE MASTERCLASS"}
        </text>
        <text x="24" y="200" fill="#F3F6FF" opacity=".9" fontFamily="ui-monospace, monospace" fontSize="13">
          {"model.fit(X, y)  →  predict()"}
        </text>
      </svg>
    </div>
  );
}
