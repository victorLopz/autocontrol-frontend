"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  ClipboardList,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
  Wrench,
} from "lucide-react";
import { cn } from "@//shared/utils/classnames";
import type { NavigationModule } from "@//types/auth-session";

interface SidebarNavProps {
  modules: NavigationModule[];
  onNavigate?: () => void;
}

function resolveIconKey(module: NavigationModule) {
  const explicitIcon = module.icon?.toLowerCase();
  const key = explicitIcon ?? module.label.toLowerCase();

  if (explicitIcon === "clipboard-list") {
    return "clipboard-list";
  }

  if (explicitIcon === "inventory") {
    return "inventory";
  }

  if (explicitIcon === "layout-dashboard" || explicitIcon === "dashboard") {
    return "dashboard";
  }

  if (explicitIcon === "sales") {
    return "sales";
  }

  if (explicitIcon === "settings") {
    return "settings";
  }

  if (explicitIcon === "users") {
    return "users";
  }

  if (explicitIcon === "workshop") {
    return "workshop";
  }

  if (key.includes("invent")) {
    return "inventory";
  }

  if (key.includes("venta")) {
    return "sales";
  }

  if (key.includes("usuario") || key.includes("cliente")) {
    return "users";
  }

  if (key.includes("config")) {
    return "settings";
  }

  if (key.includes("taller") || key.includes("servicio")) {
    return "workshop";
  }

  return "dashboard";
}

function SidebarItemIcon({ module }: { module: NavigationModule }) {
  const iconKey = resolveIconKey(module);

  switch (iconKey) {
    case "clipboard-list":
      return <ClipboardList className="h-4 w-4 shrink-0" />;
    case "inventory":
      return <Package className="h-4 w-4 shrink-0" />;
    case "sales":
      return <ShoppingCart className="h-4 w-4 shrink-0" />;
    case "settings":
      return <Settings className="h-4 w-4 shrink-0" />;
    case "users":
      return <Users className="h-4 w-4 shrink-0" />;
    case "workshop":
      return <Wrench className="h-4 w-4 shrink-0" />;
    default:
      return <LayoutDashboard className="h-4 w-4 shrink-0" />;
  }
}

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarNavItem({
  module,
  pathname,
  depth = 0,
  onNavigate,
}: {
  module: NavigationModule;
  pathname: string;
  depth?: number;
  onNavigate?: () => void;
}) {
  const active = isActive(pathname, module.href);

  return (
    <div className="space-y-1">
      <Link
        href={module.href}
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition",
          "text-slate-300 hover:bg-slate-800 hover:text-white",
          active && "bg-amber-400 text-slate-950 hover:bg-amber-300",
          depth > 0 && "ml-4 rounded-xl px-3 py-2 text-[13px]",
        )}
      >
        <SidebarItemIcon module={module} />
        <span className="flex-1">{module.label}</span>
        {module.children?.length ? <ChevronRight className="h-4 w-4 opacity-70" /> : null}
      </Link>

      {module.children?.length ? (
        <div className="space-y-1">
          {module.children.map((child) => (
            <SidebarNavItem
              key={child.id}
              module={child}
              pathname={pathname}
              depth={depth + 1}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function SidebarNav({ modules, onNavigate }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-4">
      <p className="px-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500"></p>
      {modules.map((module) => (
        <SidebarNavItem key={module.id} module={module} pathname={pathname} onNavigate={onNavigate} />
      ))}
    </nav>
  );
}
