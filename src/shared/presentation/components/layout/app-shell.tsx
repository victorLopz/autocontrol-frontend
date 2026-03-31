import { ReactNode } from "react";
import type { AuthSession } from "@//types/auth-session";
import { Sidebar } from "./sidebar/sidebar";

interface AppShellProps {
  session: AuthSession;
  children: ReactNode;
}

export function AppShell({ session, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <Sidebar session={session} />
      <main className="min-w-0 flex-1 lg:ml-0">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.16),_transparent_24%),linear-gradient(180deg,_#f8fafc_0%,_#eef2f7_100%)] px-4 pb-8 pt-20 lg:px-8 lg:pt-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </div>
      </main>
    </div>
  );
}
