
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { AnimatedNumber } from "./AnimatedNumber";
import { eventStats, highlights } from "./home.data";

export function HomeStats() {
  return (
    <>
      {/* Highlights ticker */}
      <section
        aria-label="Expo highlights"
        className="overflow-hidden bg-brand text-brand-black"
      >
        <div
          aria-hidden="true"
          className="flex min-w-max animate-[ticker_34s_linear_infinite] items-center py-3.5"
        >
          {[...highlights, ...highlights].map((item, i) => (
            <div
              key={`${item}-${i}`}
              className="flex items-center whitespace-nowrap px-6 text-[10px] font-extrabold uppercase tracking-[.1em] sm:text-[11px]"
            >
              {item}

              <span
                aria-hidden="true"
                className="ml-6 h-3.5 w-px rotate-[22deg] bg-black/35"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Event scale / stats */}
      <section
        aria-labelledby="event-scale-heading"
        className="section-space relative overflow-hidden bg-white"
      >
        <IndustrialLines />

        <Container className="relative">
          <Reveal>
            <div className="grid gap-7 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-[2px] w-10 bg-brand"
                  />

                  <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-zinc-950">
                    Event Scale
                  </p>
                </div>

                <h2
                  id="event-scale-heading"
                  className="max-w-3xl text-[clamp(2rem,3.2vw,3.5rem)] font-black leading-[1.02] tracking-[-.045em] text-zinc-950"
                >
                  A platform built for scale,
                  <span className="text-brand"> business </span>
                  & innovation
                </h2>
              </div>

              <div className="max-w-xl lg:justify-self-end">
                <p className="text-sm leading-7 text-zinc-700">
                  OMIIE 2027 brings together industry leaders, decision-makers,
                  innovators and buyers from across India and global mining
                  ecosystems.
                </p>

                <div
                  aria-hidden="true"
                  className="mt-5 h-px w-full bg-zinc-200"
                >
                  <div className="h-px w-24 bg-brand" />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 border-l border-t border-zinc-200 sm:grid-cols-4">
            {eventStats.map(([value, label], index) => (
              <Reveal key={label}>
                <article
                  aria-label={`${value} ${label}`}
                  className="group relative min-h-[150px] overflow-hidden border-b border-r border-zinc-200 bg-white p-5 transition duration-500 hover:bg-brand-black sm:min-h-[160px] sm:p-6"
                >
                  <span
                    aria-hidden="true"
                    className="absolute right-4 top-4 text-[10px] font-bold tracking-[.14em] text-zinc-400 transition group-hover:text-zinc-600"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="counter-number text-3xl font-black tracking-[-.055em] text-zinc-950 transition duration-300 group-hover:text-brand sm:text-[2.1rem]">
                    <AnimatedNumber value={value} />
                  </div>

                  <p className="mt-3 max-w-[150px] text-[13px] font-medium leading-5 text-zinc-700 transition group-hover:text-white/80">
                    {label}
                  </p>

                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100"
                  />
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function IndustrialLines() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 600 300"
      className="pointer-events-none absolute right-[-80px] top-10 hidden w-[520px] opacity-40 lg:block"
      fill="none"
    >
      <path d="M80 250 290 40H600" stroke="#E5E5E5" />
      <path d="M150 300 360 90H600" stroke="#E5E5E5" />
      <path
        d="M220 300 430 90"
        stroke="#F9B900"
        strokeOpacity=".8"
      />
      <circle cx="290" cy="40" r="4" fill="#F9B900" />
    </svg>
  );
}
