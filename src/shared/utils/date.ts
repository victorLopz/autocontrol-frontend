import {
  DEFAULT_LOCALE,
  DEFAULT_TIMEZONE
} from "@/src/shared/constants/app.constants";

export function formatDate(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    timeZone: DEFAULT_TIMEZONE,
    dateStyle: "medium",
    ...options
  }).format(parsedDate);
}
