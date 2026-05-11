import { clamp } from '@/lib/fitness';

export function ProgressBar({ label, value, tone = 'red' }: { label: string; value: number; tone?: 'red' | 'white' }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-zinc-300">{label}</span>
        <span className="font-bold">{Math.round(value)}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className={tone === 'red' ? 'h-full rounded-full bg-ember transition-all duration-700' : 'h-full rounded-full bg-white transition-all duration-700'}
          style={{ width: `${clamp(value)}%` }}
        />
      </div>
    </div>
  );
}
