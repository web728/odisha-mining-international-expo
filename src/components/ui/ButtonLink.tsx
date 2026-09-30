import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "dark" | "outline";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  const styles = {
    primary:
      "border-brand bg-brand text-brand-black hover:bg-brand-light",
    dark:
      "border-brand-black bg-brand-black text-white hover:border-brand hover:bg-brand hover:text-brand-black",
    outline:
      "border-current bg-transparent hover:border-brand hover:bg-brand hover:text-brand-black",
  };

  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 border px-5 py-3 text-[11px] font-extrabold uppercase tracking-[.09em] transition-all duration-300 hover:-translate-y-0.5 sm:px-6 ${styles[variant]} ${className}`}
    >
      <span>{children}</span>

      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}