import { clamp } from '@/lib/fitness';

type MetricRingProps = {
  label: string;
  value: number;
  target: number;
  unit: string;
  accent?: string;
};

export function MetricRing({ label, value, target, unit, accent = '#ff304f' }: MetricRingProps) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const progress = clamp((value / target) * 100);
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="glass-card flex items-center gap-4 p-4 animate-rise">
      <div className="relative grid h-24 w-24 place-items-center">
        <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r={radius} stroke="rgba(255,255,255,.12)" strokeWidth="9" fill="none" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={accent}
            strokeLinecap="round"
            strokeWidth="9"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <span className="absolute text-lg font-black">{Math.round(progress)}%</span>
      </div>
      <div>
        <p className="text-sm text-zinc-400">{label}</p>
        <p className="mt-1 text-2xl font-black tracking-tight">{value.toLocaleString()}</p>
        <p className="text-xs text-zinc-500">of {target.toLocaleString()} {unit}</p>
      </div>
    </div>
  );
}
