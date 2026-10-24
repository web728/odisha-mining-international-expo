import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const base =
  "mt-2 w-full border border-zinc-300 bg-white px-4 py-3.5 text-sm text-zinc-950 outline-none transition duration-300 placeholder:text-zinc-400 hover:border-zinc-400 focus:border-brand focus:ring-2 focus:ring-brand/15";

type FieldLabelProps = {
  label: string;
  required?: boolean;
  children: ReactNode;
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
        {required && (
          <span className="ml-1 text-brand-dark" aria-hidden="true">
            *
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export function TextField({
  label,
  name,
  required = false,
  className = "",
  ...props
}: TextFieldProps) {
  return (
    <FieldLabel label={label} required={required}>
      <input
        {...props}
        name={name}
        required={required}
        className={`${base} ${className}`.trim()}
      />
    </FieldLabel>
  );
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  name: string;
  children: ReactNode;
};

export function SelectField({
  label,
  name,
  required = false,
  className = "",
  children,
  ...props
}: SelectFieldProps) {
  return (
    <FieldLabel label={label} required={required}>
      <select
        {...props}
        name={name}
        required={required}
        className={`${base} cursor-pointer appearance-none pr-10 ${className}`.trim()}
      >
        {children}
      </select>
    </FieldLabel>
  );
}

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
};

export function TextAreaField({
  label,
  name,
  required = false,
  className = "",
  ...props
}: TextAreaFieldProps) {
  return (
    <FieldLabel label={label} required={required}>
      <textarea
        {...props}
        name={name}
        required={required}
        className={`${base} min-h-36 resize-y leading-6 ${className}`.trim()}
      />
    </FieldLabel>
  );
}

export const submitClass =
  "group inline-flex min-h-12 items-center justify-center gap-3 border border-brand-black bg-brand-black px-6 py-3 text-[11px] font-extrabold uppercase tracking-[.09em] text-white transition duration-300 hover:border-brand hover:bg-brand hover:text-brand-black disabled:cursor-not-allowed disabled:opacity-50";
