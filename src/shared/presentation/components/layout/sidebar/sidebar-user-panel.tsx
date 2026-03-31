"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { ACCESS_TOKEN_KEY, AUTH_SESSION_KEY } from "@//shared/constants/auth.constants";
import { ROUTES } from "@//shared/constants/routes.constants";
import { cookie } from "@//shared/infrastructure/lib/cookie";
import { useAppDispatch } from "@//store/hooks";
import { authSlice } from "@//store/slices/auth";
import type { AuthUser } from "@//types/auth-session";

interface SidebarUserPanelProps {
  user: AuthUser;
}

export function SidebarUserPanel({ user }: SidebarUserPanelProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    cookie.remove(ACCESS_TOKEN_KEY);
    cookie.remove(AUTH_SESSION_KEY);
    dispatch(authSlice.actions.logout());
    router.replace(ROUTES.LOGIN);
  };

  return (
    <div className="border-t border-slate-800 p-4">
      <div className="rounded-2xl bg-slate-900/80 p-4 ring-1 ring-white/5">
        <p className="text-sm font-semibold text-white">{user.name}</p>
        <p className="mt-1 truncate text-xs text-slate-400">{user.email}</p>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesion
        </button>
      </div>
    </div>
  );
}
