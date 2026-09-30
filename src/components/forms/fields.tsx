import {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const base =
  "mt-2 w-full border border-zinc-300 bg-white px-4 py-3.5 text-sm text-zinc-950 outline-none transition duration-300 placeholder:text-zinc-400 hover:border-zinc-400 focus:border-brand focus:ring-2 focus:ring-brand/15";

type FieldLabelProps = {
  label: string;
  required?: boolean;
  children: React.ReactNode;
};

function FieldLabel({
  label,
  required = false,
  children,
}: FieldLabelProps) {
  return (
    <label className="block">
      <span className="text-[11px] font-extrabold uppercase tracking-[.08em] text-zinc-700">
        {label}
        {required && <span className="ml-1 text-brand-dark">*</span>}
      </span>

      {children}
    </label>
  );
}

export function TextField({
  label,
  name,
  required = false,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
}) {
  return (
    <FieldLabel label={label} required={required}>
      <input
        name={name}
        required={required}
        className={base}
        {...props}
      />
    </FieldLabel>
  );
}

export function SelectField({
  label,
  name,
  required = false,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  name: string;
}) {
  return (
    <FieldLabel label={label} required={required}>
      <select
        name={name}
        required={required}
        className={`${base} cursor-pointer appearance-none pr-10`}
        {...props}
      >
        {children}
      </select>
    </FieldLabel>
  );
}

export function TextAreaField({
  label,
  name,
  required = false,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
}) {
  return (
    <FieldLabel label={label} required={required}>
      <textarea
        name={name}
        required={required}
        className={`${base} min-h-36 resize-y leading-6`}
        {...props}
      />
    </FieldLabel>
  );
}

export const submitClass =
  "group inline-flex min-h-12 items-center justify-center gap-3 border border-brand-black bg-brand-black px-6 py-3 text-[11px] font-extrabold uppercase tracking-[.09em] text-white transition duration-300 hover:border-brand hover:bg-brand hover:text-brand-black disabled:cursor-not-allowed disabled:opacity-50";