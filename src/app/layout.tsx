import type { Metadata } from "next";
import "./globals.css";
import {
  APP_DESCRIPTION,
  APP_NAME
} from "@//shared/constants/app.constants";
import { AppProviders } from "@//shared/presentation/providers/app-providers";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
