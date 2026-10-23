export type CallerId = "caller_1" | "caller_2";

const KEY = "ome_exhibitor_caller_v1";
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

export function validateCallerId(value: unknown): CallerId | null {
  return value === "caller_1" || value === "caller_2" ? value : null;
}

// Last valid caller link wins; direct or invalid links do not overwrite it.
export function getCallerId(): CallerId | null {
  if (typeof window === "undefined") return null;
  try {
    const incoming = validateCallerId(new URLSearchParams(window.location.search).get("utm_content"));
    if (incoming) {
      window.localStorage.setItem(KEY, JSON.stringify({ id: incoming, until: Date.now() + TTL_MS }));
      return incoming;
    }
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object") return null;
    const record = value as { id?: unknown; until?: unknown };
    const id = validateCallerId(record.id);
    if (!id || typeof record.until !== "number" || record.until <= Date.now()) {
      window.localStorage.removeItem(KEY);
      return null;
    }
    return id;
  } catch { return null; }
}
