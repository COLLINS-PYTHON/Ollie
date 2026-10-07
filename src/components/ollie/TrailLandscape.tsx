export type TrailSeason = "spring" | "summer" | "autumn" | "winter" | "christmas";

/** Calendar artwork only. It never changes learning progress or rewards. */
export function trailSeason(date: Date): TrailSeason {
  const month = date.getMonth();
  if (month === 11 && date.getDate() <= 26) return "christmas";
  if (month === 11 || month < 2) return "winter";
  if (month < 5) return "spring";
  if (month < 8) return "summer";
  return "autumn";
}

export function trailPositions(count: number) {
  // A deliberately composed, irregular walk: sweeping bends, not alternating zigzags.
  const xs = [116, 231, 204, 87, 126, 245, 194, 91, 163, 244];
  const gaps = [142, 156, 148, 161, 144];
  let y = 48;
  return Array.from({ length: count }, (_, i) => {
    if (i > 0) y += gaps[(i - 1) % gaps.length] ?? 150;
    return { x: xs[i % xs.length] ?? 170, y };
  });
}

export function trailCurve(points: Array<{ x: number; y: number }>) {
  return points.map((p, i) => {
    const prev = points[i - 1];
    if (!prev) return `M${p.x} ${p.y}`;
    const bend = (p.y - prev.y) * .56;
    return `C${prev.x} ${prev.y + bend},${p.x} ${p.y - bend},${p.x} ${p.y}`;
  }).join(" ");
}

function Tree({ x, y, snow, christmas }: { x: number; y: number; snow: boolean; christmas: boolean }) {
  return <g transform={`translate(${x} ${y})`}>
    <ellipse cy="8" rx="26" ry="7" className="trail-ground-shadow" />
    <path d="M-3-22h6V7h-6Z" className="fill-foreground" />
    <path d="M0-87-23-50h12l-22 32H33L11-50h12Z" className="trail-tree" />
    <path d="M0-87-10-67H9ZM-18-38l-15 20H33L18-38q-18 12-36 0" className={snow ? "trail-snow-cap" : "trail-tree-highlight"} />
    {christmas && <><path d="m-13-51 29 8m-39 10 47 10" className="trail-ribbon" /><circle cy="-88" r="4" className="fill-accent-4" /><circle cx="-12" cy="-40" r="3" className="fill-accent-3" /><circle cx="15" cy="-28" r="3" className="fill-primary" /></>}
  </g>;
}

export function TrailLandscape({ height, season }: { height: number; season: TrailSeason }) {
  const snow = season === "winter" || season === "christmas";
  return <svg viewBox={`0 0 340 ${height}`} className={`trail-landscape trail-season-${season} absolute inset-0 h-full w-full`} aria-hidden="true">
    {Array.from({ length: Math.ceil(height / 310) }, (_, i) => {
      const y = i * 310 + 110;
      return <g key={i}>
        <path d={`M-20 ${y + 110}Q100 ${y + 25} 215 ${y + 117}T370 ${y + 86}V${y + 198}Q170 ${y + 126}-20 ${y + 195}Z`} className="trail-meadow" />
        <g transform={`translate(0 ${i % 3 * 9})`}><Tree x={i % 2 ? 291 : 38} y={y + 38} snow={snow} christmas={season === "christmas"} /></g>
        {i % 3 === 1 ? <g transform={`translate(${i % 2 ? 27 : 301} ${y + 175})`}>
          {snow ? <><ellipse cy="13" rx="25" ry="6" className="trail-ground-shadow" /><circle r="18" className="trail-snow-cap" /><circle cy="-26" r="12" className="trail-snow-cap" /><path d="M-13-21h26m-9-7h8" className="trail-ribbon" /><circle cx="-4" cy="-29" r="1.5" className="fill-foreground" /><circle cx="4" cy="-29" r="1.5" className="fill-foreground" /></> : <><ellipse rx="27" ry="16" className="trail-pond" /><path d="M-16 0q15-6 30 0m-20 5h12" className="trail-stone-shine" /><path d="M-9-18q0-12 12-12-1 13-12 12" className="trail-leaf" /></>}
        </g> : <Tree x={i % 2 ? 24 : 302} y={y + 185} snow={snow} christmas={false} />}
        <g transform={`translate(${i % 2 ? 48 : 285} ${y + 97})`}>
          <ellipse rx="22" ry="9" className="trail-stone" /><path d="M-14-2q12-9 25 0" className="trail-stone-shine" />
          {!snow && <g className="trail-botanical"><path d="M0-4q-9-24 2-37M0-15q-21-4-18-18 18 0 18 18m2-9q18-7 18-21-20 3-18 21" className="trail-leaf" />{season === "spring" && <circle cx="3" cy="-42" r="7" className="fill-accent-3" />}</g>}
        </g>
        {snow ? Array.from({ length: 7 }, (_, j) => <circle key={j} cx={25 + j * 47} cy={y - 80 + j % 3 * 28} r={j % 2 ? 2 : 3} className={`trail-snowfall trail-snow-${j % 3}`} />) : <g transform={`translate(${i % 2 ? 274 : 65} ${y - 35})`} className="trail-butterfly">
          <path d="M0 0C-30-29-25 14 0 9C25 14 30-29 0 0Z" className="fill-accent-3" /><path d="M0-4v16" className="trail-fine-line" />
        </g>}
      </g>;
    })}
  </svg>;
}