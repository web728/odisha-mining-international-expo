"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { Container } from "@/components/ui/Container";

const navItems = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Why Odisha",
    href: "/why-odisha",
  },
  {
    label: "Exhibit",
    href: "/exhibit",
    items: [
      ["Why Exhibit", "/exhibit"],
      [
        "Exhibitor Registration",
        "/exhibitor-registration",
      ],
    ],
  },
  {
    label: "Visit",
    href: "/visit",
    items: [
      ["Why Visit", "/visit"],
      [
        "Visitor Registration",
        "/visitor-registration",
      ],
    ],
  },
  {
    label: "Venue",
    href: "/venue",
  },
  {
    label: "Download",
    href: "/brochure",
    items: [
      ["Brochure", "/brochure"],
      // Yaha par PDF ka path update kiya gaya hai
      ["Post Show Report", "/downloads/5th-Odisha-Mining-Expo-2027-Post-Show-Report.pdf"],
    ],
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "Contact",
    href: "/contact",
  },
] as const;

const NAV_ITEM_CLASS =
  "relative flex h-10 items-center gap-1.5 px-3 text-[11px] font-extrabold uppercase leading-none tracking-[.055em] text-white/65 transition-colors duration-200 hover:text-white focus-visible:outline-none";

export function Navbar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const [mobileMenu, setMobileMenu] =
    useState<string | null>(null);

  useEffect(() => {
    setOpen(false);
    setMobileMenu(null);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const onKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      onKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        onKeyDown
      );
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/96 text-white backdrop-blur-xl">
        <div className="h-[2px] bg-brand" />

        <Container className="flex h-[72px] items-center justify-between gap-6 lg:h-[78px]">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Odisha Mining Expo home"
            className="group relative block h-16 w-[245px] shrink-0 sm:h-[72px] sm:w-[275px]"
          >
            <Image
              src="/image/5th-Odisha-Logo_White.png"
              alt="Odisha Mining Expo 2027"
              fill
              priority
              sizes="275px"
              className="object-contain object-left transition-opacity duration-300 group-hover:opacity-85"
            />
          </Link>

          {/* Desktop navigation */}
          <nav
            className="hidden items-center lg:flex"
            aria-label="Primary navigation"
          >
            {navItems.map((item) =>
              "items" in item ? (
                <DropdownNavItem
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  items={item.items}
                  active={isDropdownActive(
                    pathname,
                    item.href,
                    item.items
                  )}
                />
              ) : (
                <NavLink
                  key={item.href}
                  href={item.href}
                  active={isActive(
                    pathname,
                    item.href
                  )}
                >
                  {item.label}
                </NavLink>
              )
            )}

            <div
              aria-hidden
              className="mx-2 h-5 w-px bg-white/12"
            />

            <Link
              href="/exhibitor-registration"
              className="group ml-1 inline-flex h-11 items-center justify-center gap-2 border border-brand bg-brand px-5 text-[10px] font-black uppercase tracking-[.09em] text-brand-black transition-colors duration-300 hover:bg-brand-light"
            >
              <span>Book Your Stand</span>

              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </nav>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() =>
              setOpen((value) => !value)
            }
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={
              open
                ? "Close navigation"
                : "Open navigation"
            }
            className="relative grid size-11 place-items-center border border-white/15 text-white transition-colors duration-200 hover:border-brand hover:text-brand lg:hidden"
          >
            {open ? (
              <X className="size-[18px]" />
            ) : (
              <Menu className="size-[19px]" />
            )}
          </button>
        </Container>
      </header>

      {/* Mobile navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -8,
            }}
            transition={{
              duration: 0.22,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed inset-x-0 bottom-0 top-[74px] z-40 overflow-y-auto bg-[#050505] text-white lg:hidden"
          >
            <Container className="py-5">
              <div className="border-t border-white/10">
                {navItems.map((item) =>
                  "items" in item ? (
                    <MobileDropdown
                      key={item.label}
                      label={item.label}
                      items={item.items}
                      open={
                        mobileMenu ===
                        item.label
                      }
                      active={isDropdownActive(
                        pathname,
                        item.href,
                        item.items
                      )}
                      onToggle={() =>
                        setMobileMenu(
                          mobileMenu ===
                            item.label
                            ? null
                            : item.label
                        )
                      }
                    />
                  ) : (
                    <MobileLink
                      key={item.href}
                      href={item.href}
                      active={isActive(
                        pathname,
                        item.href
                      )}
                    >
                      {item.label}
                    </MobileLink>
                  )
                )}
              </div>

              <div className="mt-7 border-t border-white/10 pt-6">
                <Link
                  href="/exhibitor-registration"
                  className="group flex min-h-12 w-full items-center justify-between bg-brand px-5 text-[11px] font-black uppercase tracking-[.09em] text-brand-black"
                >
                  <span>
                    Book Your Stand
                  </span>

                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>

                <p className="mt-5 text-[9px] font-bold uppercase leading-5 tracking-[.14em] text-white/28">
                  07–10 January 2027
                  <br />
                  Bhubaneswar · Odisha
                </p>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`${NAV_ITEM_CLASS} ${
        active ? "text-white" : ""
      }`}
    >
      <span>{children}</span>

      <span
        className={`absolute inset-x-3 bottom-0 h-[2px] origin-left bg-brand transition-transform duration-300 ${
          active
            ? "scale-x-100"
            : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </Link>
  );
}

function DropdownNavItem({
  label,
  href,
  items,
  active,
}: {
  label: string;
  href: string;
  items: readonly (
    readonly [string, string]
  )[];
  active: boolean;
}) {
  return (
    <div className="group relative">
      <Link
        href={href}
        className={`${NAV_ITEM_CLASS} ${
          active ? "text-white" : ""
        }`}
      >
        <span>{label}</span>

        <ChevronDown className="size-3.5 text-white/35 transition-transform duration-300 group-hover:rotate-180 group-hover:text-brand" />

        <span
          className={`absolute inset-x-3 bottom-0 h-[2px] origin-left bg-brand transition-transform duration-300 ${
            active
              ? "scale-x-100"
              : "scale-x-0 group-hover:scale-x-100"
          }`}
        />
      </Link>

      {/* Hover bridge */}
      <div className="absolute left-0 top-full h-3 w-full" />

      {/* Dropdown */}
      <div className="pointer-events-none absolute left-0 top-[calc(100%+10px)] w-[235px] translate-y-2 border border-white/10 bg-[#090909] opacity-0 shadow-[0_24px_60px_rgba(0,0,0,.45)] transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
        <div className="h-[2px] bg-brand" />

        {items.map(([name, itemHref]) => {
          // Check if link is a PDF to open in new tab
          const isPdf = itemHref.endsWith(".pdf");
          
          return (
            <Link
              key={itemHref}
              href={itemHref}
              target={isPdf ? "_blank" : undefined}
              rel={isPdf ? "noopener noreferrer" : undefined}
              className="block border-b border-white/[.07] px-4 py-3.5 text-[12px] font-semibold text-white/65 transition-colors last:border-b-0 hover:bg-white/[.035] hover:text-white"
            >
              {name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function MobileLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-[54px] items-center justify-between border-b border-white/10"
    >
      <span
        className={`text-[13px] font-extrabold uppercase tracking-[.055em] transition-colors ${
          active
            ? "text-brand"
            : "text-white/72 group-hover:text-white"
        }`}
      >
        {children}
      </span>

      <ArrowUpRight
        className={`size-3.5 ${
          active
            ? "text-brand"
            : "text-white/20"
        }`}
      />

      {active && (
        <span className="absolute bottom-0 left-0 h-[2px] w-8 bg-brand" />
      )}
    </Link>
  );
}

function MobileDropdown({
  label,
  items,
  open,
  active,
  onToggle,
}: {
  label: string;
  items: readonly (
    readonly [string, string]
  )[];
  open: boolean;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex min-h-[54px] w-full items-center justify-between"
      >
        <span
          className={`text-[13px] font-extrabold uppercase tracking-[.055em] ${
            active
              ? "text-brand"
              : "text-white/72"
          }`}
        >
          {label}
        </span>

        <ChevronDown
          className={`size-4 transition-transform duration-300 ${
            open
              ? "rotate-180 text-brand"
              : "text-white/30"
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/[.07] bg-white/[.025] py-1">
              {items.map(([name, href]) => {
                // Check if link is a PDF to open in new tab
                const isPdf = href.endsWith(".pdf");
                
                return (
                  <Link
                    key={href}
                    href={href}
                    target={isPdf ? "_blank" : undefined}
                    rel={isPdf ? "noopener noreferrer" : undefined}
                    className="flex min-h-12 items-center justify-between px-4 text-[12px] font-semibold text-white/52 transition-colors hover:text-white"
                  >
                    <span>{name}</span>

                    <ArrowUpRight className="size-3.5 text-white/20" />
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function isActive(
  pathname: string,
  href: string
) {
  return (
    pathname === href ||
    pathname.startsWith(
      `${href}/`
    )
  );
}

function isDropdownActive(
  pathname: string,
  href: string,
  items: readonly (
    readonly [string, string]
  )[]
) {
  return (
    isActive(pathname, href) ||
    items.some(([, itemHref]) =>
      isActive(pathname, itemHref)
    )
  );
}