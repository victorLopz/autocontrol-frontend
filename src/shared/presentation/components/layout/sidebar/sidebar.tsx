"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { AuthSession } from "@//types/auth-session";
import { cn } from "@/shared/utils/classnames";
import { SidebarBrand } from "./sidebar-brand";
import { SidebarNav } from "./sidebar-nav";
import { SidebarUserPanel } from "./sidebar-user-panel";

interface SidebarProps {
  session: AuthSession;
}

export function Sidebar({ session }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="fixed left-4 top-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg ring-1 ring-white/10 lg:hidden"
        aria-label={isOpen ? "Cerrar menu lateral" : "Abrir menu lateral"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div
        className={cn(
          "fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-sm transition lg:hidden",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={closeSidebar}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-80 flex-col bg-slate-950 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarBrand />
        <SidebarNav modules={session.modules} onNavigate={closeSidebar} />
        <SidebarUserPanel user={session.user} />
      </aside>
    </>
  );
}
