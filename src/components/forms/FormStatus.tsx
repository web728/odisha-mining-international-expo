import {
  CheckCircle2,
  CircleAlert,
  Loader2,
} from "lucide-react";

type Status = {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
};

export function FormStatus({ status }: { status: Status }) {
  if (status.type === "idle") return null;

  const config = {
    loading: {
      icon: <Loader2 className="size-4 animate-spin" />,
      className:
        "border-zinc-300 bg-white text-zinc-700",
      message: "Submitting…",
    },
    success: {
      icon: <CheckCircle2 className="size-4" />,
      className:
        "border-emerald-300 bg-emerald-50 text-emerald-800",
      message: "Submitted successfully.",
    },
    error: {
      icon: <CircleAlert className="size-4" />,
      className:
        "border-red-300 bg-red-50 text-red-800",
      message: "Submission failed.",
    },
  } as const;

  const state = config[status.type];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-start gap-3 border-l-[3px] px-4 py-3.5 text-sm leading-6 ${state.className}`}
    >
      <span className="mt-1 shrink-0">{state.icon}</span>

      <p className="font-medium">
        {status.message || state.message}
      </p>
    </div>
  );
}