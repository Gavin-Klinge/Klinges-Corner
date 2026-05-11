export function LineChart({ values, label }: { values: number[]; label: string }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * 100;
    const y = 80 - ((value - min) / Math.max(max - min, 1)) * 60;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="glass-card p-5">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <p className="text-sm text-zinc-400">{label}</p>
          <p className="text-2xl font-black">{values[values.length - 1]} lb</p>
        </div>
        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">trend -3.5 lb</span>
      </div>
      <svg viewBox="0 0 100 90" className="h-36 w-full overflow-visible" aria-label={label}>
        <defs>
          <linearGradient id="weightGlow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ff304f" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ff304f" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline points={`0,86 ${points} 100,86`} fill="url(#weightGlow)" stroke="none" />
        <polyline points={points} fill="none" stroke="#ff304f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
