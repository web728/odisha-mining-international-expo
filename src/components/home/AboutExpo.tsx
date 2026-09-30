import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/animations/Reveal";

export function AboutExpo() {
  return (
    <section className="section-space overflow-hidden bg-[#f4f4f1]">
      <Container className="grid gap-12 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:gap-16">
        <Reveal>
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-brand" />
              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-zinc-500 sm:text-[11px]">
                About the Expo
              </p>
            </div>

            <h2 className="max-w-xl text-[clamp(2rem,3.4vw,3.5rem)] font-black leading-[1.02] tracking-[-.045em] text-zinc-950">
              The industry platform driving{" "}
              <span className="text-brand">mining innovation</span>
            </h2>

            <p className="mt-6 max-w-xl text-[15px] leading-7 text-zinc-600">
              Odisha Mining & Infrastructure International Expo has emerged as
              a leading B2B platform connecting mining leaders, technology
              providers, equipment manufacturers, policymakers, investors,
              infrastructure players and industrial stakeholders.
            </p>

            <div className="mt-6 max-w-xl border-l-2 border-brand pl-4">
              <p className="text-[15px] leading-7 text-zinc-700">
                The expo creates opportunities for business partnerships,
                innovation exchange, product showcasing, networking and
                sector-wide collaboration — across four business days in
                Bhubaneswar.
              </p>
            </div>

          <ButtonLink
  href="/about"
  variant="dark"
  className="mt-8 !text-white"
>
  <span className="inline-flex items-center gap-2">
    About the Show
    {/* <ArrowUpRight className="size-4" /> */}
  </span>
</ButtonLink>
          </div>
        </Reveal>

        <Reveal>
          <div className="relative">
            <div className="absolute -right-4 -top-4 hidden h-28 w-28 border-r border-t border-brand/50 lg:block" />
            <div className="absolute -bottom-4 -left-4 hidden h-28 w-28 border-b border-l border-zinc-300 lg:block" />

            <div className="image-premium relative aspect-[4/3] overflow-hidden bg-zinc-200">
              <Image
                src="/image/expo/DSC06793.JPG"
                alt="Visitors exploring machinery on the Odisha Mining Expo exhibition floor"
                fill
                sizes="(max-width:1024px) 100vw, 55vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

              <div className="absolute left-5 top-5 flex items-center gap-2">
                <span className="size-2 bg-brand" />
                <span className="text-[9px] font-extrabold uppercase tracking-[.16em] text-white">
                  OMIIE 2027
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-6">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[.16em] text-brand">
                    Venue
                  </p>
                  <p className="mt-1 text-sm font-bold text-white">
                    Bhubaneswar · Odisha
                  </p>
                </div>

                <span className="h-px w-14 bg-brand" />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}