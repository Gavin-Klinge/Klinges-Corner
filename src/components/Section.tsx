export function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 py-6">
      <p className="text-xs font-black uppercase tracking-[0.3em] text-ember">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-black tracking-tight text-white">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}
