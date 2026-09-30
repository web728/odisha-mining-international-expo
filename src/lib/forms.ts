export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function clean(value: unknown, max = 1000) {
  return typeof value === "string"
    ? value.trim().slice(0, max)
    : "";
}

export function cleanArray(value: unknown, maxItems = 20, maxLength = 250) {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is string => typeof item === "string")
    .slice(0, maxItems)
    .map((item) => clean(item, maxLength))
    .filter(Boolean);
}

export function cleanBoolean(value: unknown) {
  return value === true || value === "true";
}

export function submittedAt() {
  return new Date().toLocaleString("en-IN", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });
}