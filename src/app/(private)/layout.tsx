import { redirect } from "next/navigation";
import { ROUTES } from "@//shared/constants/routes.constants";
import { getAuthSession } from "@//shared/infrastructure/lib/auth-session.server";
import { AppShell } from "@//shared/presentation/components/layout/app-shell";

export default async function PrivateLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  if (!session) {
    redirect(ROUTES.LOGIN);
  }

  return <AppShell session={session}>{children}</AppShell>;
}
