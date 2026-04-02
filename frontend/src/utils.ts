import type { BarItem, EventItem, Language } from "./types/api";

type LocalizedField = "title" | "short_description" | "full_description";

type LocalizedEntity = EventItem | BarItem;

export function pickLocalized<T extends LocalizedEntity>(
  entity: T,
  field: LocalizedField,
  language: Language,
) {
  const key = `${field}_${language}` as keyof T;
  return String(entity[key]);
}

export function formatDateTime(value: string, language: Language) {
  return new Intl.DateTimeFormat(language === "ru" ? "ru-RU" : "en-US", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function priceFormatter(price: string, currency: string, language: Language) {
  return new Intl.NumberFormat(language === "ru" ? "ru-RU" : "en-US", {
    style: "currency",
    currency: currency || "HUF",
    maximumFractionDigits: 0,
  }).format(Number(price));
}
