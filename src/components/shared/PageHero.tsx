import { Container } from "@/components/ui/Container";
export function PageHero({ title, subtitle, label }: { title: string; subtitle?: string; label?: string }) {
  return <section className="bg-zinc-950 py-14 text-white sm:py-16"><Container>
    {label && <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-yellow-300">{label}</p>}
    <h1 className="mt-3 max-w-5xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
    {subtitle && <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300 sm:text-lg">{subtitle}</p>}
  </Container></section>;
}
