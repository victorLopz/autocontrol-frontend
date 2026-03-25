export function capitalize(value: string): string {
  if (!value.trim()) return value;

  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function toSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
