export type CallerId =
  | "caller_1" | "caller_2" | "social_media" | "ads"
  | "combined_ads" | "whatsapp_ads" | "email";

const VALID = new Set<string>([
  "caller_1", "caller_2", "social_media", "ads",
  "combined_ads", "whatsapp_ads", "email",
]);
const OLD_KEY = "ome_exhibitor_caller_v1";
const KEY = "ome_tracking_source_v2";
const SESSION_KEY = "ome_tracking_session_v2";
const TTL = 30 * 24 * 60 * 60 * 1000;
type Stored = { id: CallerId; until: number };
let memory: Stored | null = null;

export function validateCallerId(input: unknown): CallerId | null {
  return typeof input === "string" && VALID.has(input) ? input as CallerId : null;
}
function parse(raw: string | null): Stored | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object") return null;
    const data = value as { id?: unknown; until?: unknown };
    const id = validateCallerId(data.id);
    return id && typeof data.until === "number" && data.until > Date.now()
      ? { id, until: data.until } : null;
  } catch { return null; }
}
export function captureCallerAttribution(): CallerId | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const incoming = validateCallerId(params.get("utm_content"));
  if (incoming) {
    memory = { id: incoming, until: Date.now() + TTL };
    const raw = JSON.stringify(memory);
    try { localStorage.setItem(KEY, raw); } catch { /* disabled */ }
    try { sessionStorage.setItem(SESSION_KEY, raw); } catch { /* disabled */ }
    return incoming;
  }
  let local: Stored | null = null;
  let session: Stored | null = null;
  let legacy: Stored | null = null;
  try { local = parse(localStorage.getItem(KEY)); } catch { /* disabled */ }
  try { session = parse(sessionStorage.getItem(SESSION_KEY)); } catch { /* disabled */ }
  try { legacy = parse(localStorage.getItem(OLD_KEY)); } catch { /* disabled */ }
  const winner = [local, session, memory, legacy]
    .filter((v): v is Stored => Boolean(v && v.until > Date.now()))
    .sort((a, b) => b.until - a.until)[0] ?? null;
  memory = winner;
  return winner?.id ?? null;
}
export function getCallerId(): CallerId | null { return captureCallerAttribution(); }
