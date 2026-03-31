import { ROUTES } from "@//shared/constants/routes.constants";
import type { NavigationModule } from "@//types/auth-session";

type UnknownRecord = Record<string, unknown>;

const FALLBACK_MODULES: NavigationModule[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: ROUTES.DASHBOARD,
    icon: "layout-dashboard",
  },
];

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

function getStringValue(record: UnknownRecord, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }

  return undefined;
}

function getChildren(value: unknown): unknown[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value;
}

function normalizeModule(item: unknown, index: number): NavigationModule | null {
  if (!isRecord(item)) {
    return null;
  }

  const label = getStringValue(item, ["label", "name", "title", "moduleName"]);
  const href = getStringValue(item, ["href", "path", "url", "route", "slug"]);

  if (!label || !href) {
    return null;
  }

  const children = getChildren(item.children ?? item.modules ?? item.items)
    .map((child, childIndex) => normalizeModule(child, childIndex))
    .filter((child): child is NavigationModule => child !== null);

  return {
    id: getStringValue(item, ["id", "code", "key"]) ?? `${label.toLowerCase().replace(/\s+/g, "-")}-${index}`,
    label,
    href,
    icon: getStringValue(item, ["icon", "iconName"]),
    children: children.length > 0 ? children : undefined,
  };
}

export function normalizeNavigationModules(source: unknown): NavigationModule[] {
  if (!Array.isArray(source)) {
    return FALLBACK_MODULES;
  }

  const modules = source
    .map((item, index) => normalizeModule(item, index))
    .filter((item): item is NavigationModule => item !== null);

  return modules.length > 0 ? modules : FALLBACK_MODULES;
}
