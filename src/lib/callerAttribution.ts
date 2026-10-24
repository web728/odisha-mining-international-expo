export type CallerId = "caller_1" | "caller_2";

const KEY = "ome_exhibitor_caller_v1"; // preserve current users' attribution
const SESSION_KEY = "ome_caller_session_v1";
const TTL = 30 * 24 * 60 * 60 * 1000;
type RecordValue = { id: CallerId; until: number };
let memory: RecordValue | null = null;

export function validateCallerId(value: unknown): CallerId | null {
  return value === "caller_1" || value === "caller_2" ? value : null;
}

function parse(raw: string | null): RecordValue | null {
  if (!raw) return null;
  try {
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== "object") return null;
    const obj = data as { id?: unknown; until?: unknown };
    const id = validateCallerId(obj.id);
    return id && typeof obj.until === "number" && obj.until > Date.now()
      ? { id, until: obj.until } : null;
  } catch { return null; }
}

/** Capture UTM on arrival; latest valid caller link wins for 30 days. */
export function captureCallerAttribution(): CallerId | null {
  if (typeof window === "undefined") return null;
  const incoming = validateCallerId(
    new URLSearchParams(window.location.search).get("utm_content")
  );
  if (incoming) {
    memory = { id: incoming, until: Date.now() + TTL };
    const serialized = JSON.stringify(memory);
    try { window.localStorage.setItem(KEY, serialized); } catch { /* blocked */ }
    try { window.sessionStorage.setItem(SESSION_KEY, serialized); } catch { /* blocked */ }
    return incoming;
  }
  let local: RecordValue | null = null;
  let session: RecordValue | null = null;
  try { local = parse(window.localStorage.getItem(KEY)); } catch { /* blocked */ }
  try { session = parse(window.sessionStorage.getItem(SESSION_KEY)); } catch { /* blocked */ }
  const winner = [local, session, memory]
    .filter((item): item is RecordValue => !!item && item.until > Date.now())
    .sort((a, b) => b.until - a.until)[0] ?? null;
  if (!winner) {
    try { window.localStorage.removeItem(KEY); } catch { /* blocked */ }
    try { window.sessionStorage.removeItem(SESSION_KEY); } catch { /* blocked */ }
  }
  memory = winner;
  return winner?.id ?? null;
}

export function getCallerId(): CallerId | null {
  return captureCallerAttribution();
}
