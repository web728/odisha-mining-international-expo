export function SectionHeading({ eyebrow, title, text, light = false }: { eyebrow?: string; title: string; text?: string; light?: boolean }) {
  return <div className="max-w-3xl">
    {eyebrow && <p className={`mb-3 text-xs font-extrabold uppercase tracking-[0.24em] ${light ? "text-yellow-300" : "text-yellow-600"}`}>{eyebrow}</p>}
    <h2 className={`text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl ${light ? "text-white" : "text-zinc-950"}`}>{title}</h2>
    {text && <p className={`mt-5 max-w-2xl text-base leading-7 sm:text-lg ${light ? "text-zinc-300" : "text-zinc-600"}`}>{text}</p>}
  </div>;
}
