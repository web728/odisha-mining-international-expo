"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

import { Container } from "@/components/ui/Container";

const menus = [
  {
    label: "Exhibit",
    items: [
      ["Why Exhibit", "/exhibit"],
      ["Exhibitor Registration", "/exhibitor-registration"],
    ],
  },
  {
    label: "Visit",
    items: [
      ["Why Visit", "/visit"],
      ["Visitor Registration", "/visitor-registration"],
    ],
  },
  {
    label: "Download",
    items: [["Brochure", "/brochure"]],
  },
] as const;

const links = [
  ["About", "/about"],
  ["Why Odisha", "/why-odisha"],
  ["Venue", "/venue"],
  ["Gallery", "/gallery"],
  ["Contact", "/contact"],
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-black/95 text-white backdrop-blur-xl">
      <Container className="flex h-18 items-center justify-between gap-6 lg:h-20">
        <Link
          href="/"
          aria-label="Odisha Mining Expo home"
          className="relative h-11 w-40 shrink-0 sm:w-44"
        >
          <Image
            src="/image/5th-Odisha-Logo_White.png"
            alt="Odisha Mining Expo 2027"
            fill
            priority
            className="object-contain object-left"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {links.slice(0, 2).map(([label, href]) => (
            <NavLink key={href} href={href}>
              {label}
            </NavLink>
          ))}

          {menus.slice(0, 2).map((menu) => (
            <Dropdown key={menu.label} {...menu} />
          ))}

          {links.slice(2).map(([label, href]) => (
            <NavLink key={href} href={href}>
              {label}
            </NavLink>
          ))}

          <Dropdown {...menus[2]} />

          <Link
            href="/exhibitor-registration"
            className="ml-2 inline-flex min-h-11 items-center border border-brand bg-brand px-4 text-[11px] font-extrabold uppercase tracking-[.08em] text-brand-black transition duration-300 hover:bg-brand-light"
          >
            Book Your Stand
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="grid size-10 place-items-center border border-white/10 transition hover:border-brand hover:text-brand lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-white/10 bg-brand-black lg:hidden">
          <Container className="py-4">
            <div className="grid">
              {links.slice(0, 2).map(([label, href]) => (
                <MobileLink key={href} href={href} onClick={() => setOpen(false)}>
                  {label}
                </MobileLink>
              ))}

              {menus.slice(0, 2).map((menu) => (
                <MobileDropdown
                  key={menu.label}
                  {...menu}
                  open={mobileMenu === menu.label}
                  onToggle={() =>
                    setMobileMenu(mobileMenu === menu.label ? null : menu.label)
                  }
                  onNavigate={() => setOpen(false)}
                />
              ))}

              {links.slice(2).map(([label, href]) => (
                <MobileLink key={href} href={href} onClick={() => setOpen(false)}>
                  {label}
                </MobileLink>
              ))}

              <MobileDropdown
                {...menus[2]}
                open={mobileMenu === "Download"}
                onToggle={() =>
                  setMobileMenu(mobileMenu === "Download" ? null : "Download")
                }
                onNavigate={() => setOpen(false)}
              />

              <Link
                href="/exhibitor-registration"
                onClick={() => setOpen(false)}
                className="mt-4 bg-brand px-4 py-3 text-center text-xs font-extrabold uppercase tracking-[.08em] text-brand-black"
              >
                Book Your Stand
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative px-3 py-2 text-[12px] font-bold uppercase tracking-[.04em] text-white/75 transition hover:text-brand"
    >
      {children}
    </Link>
  );
}

function Dropdown({
  label,
  items,
}: {
  label: string;
  items: readonly (readonly [string, string])[];
}) {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 px-3 py-2 text-[12px] font-bold uppercase tracking-[.04em] text-white/75 transition group-hover:text-brand">
        {label}
        <ChevronDown className="size-3.5 transition-transform duration-300 group-hover:rotate-180" />
      </button>

      <div className="pointer-events-none absolute left-0 top-full min-w-56 translate-y-2 border border-white/10 bg-brand-black opacity-0 shadow-2xl transition duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
        {items.map(([name, href]) => (
          <Link
            key={href}
            href={href}
            className="block border-b border-white/10 px-4 py-3 text-sm text-white/70 transition last:border-b-0 hover:bg-white/[.04] hover:text-brand"
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="border-b border-white/10 py-3 text-sm font-semibold text-white/80 transition hover:text-brand"
    >
      {children}
    </Link>
  );
}

function MobileDropdown({
  label,
  items,
  open,
  onToggle,
  onNavigate,
}: {
  label: string;
  items: readonly (readonly [string, string])[];
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-3 text-sm font-semibold text-white/80"
      >
        {label}
        <ChevronDown
          className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="pb-2 pl-3">
          {items.map(([name, href]) => (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className="block py-2 text-sm text-white/55 transition hover:text-brand"
            >
              {name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}