"use client";

import { Card } from "@/src/shared/presentation/components/ui/card";
import { Input } from "@/src/shared/presentation/components/ui/input";
import { Button } from "@/src/shared/presentation/components/ui/button";
import { Car, Lock, Mail, EyeOff } from "lucide-react"; // Importa iconos

export function LoginView() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-zinc-950">
      {/* Decoración de fondo opcional para dar contexto */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none overflow-hidden">
        <Car className="absolute -left-10 -bottom-10 w-64 h-64 rotate-12" />
      </div>

      <Card className="z-10 w-full max-w-md border-t-4 border-t-blue-600 p-8 shadow-xl">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Car size={28} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Sistema de Gestión Automotriz
          </h1>
          <p className="text-sm text-slate-800">
            Lubricentro Los 2 Hermanos
          </p>
        </div>

        <form className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm text-black font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-black" />
              <Input
                type="email"
                placeholder="nombre@taller.com"
                className="pl-10 focus-visible:ring-blue-600 text-black"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium leading-none text-black">
                Contraseña
              </label>
              <button
                type="button"
                className="text-xs text-blue-600 hover:underline"
              >
                ¿Olvidaste tu clave?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-black" />
              <Input
                type="password"
                placeholder="••••••••"
                className="pl-10 focus-visible:ring-blue-600 text-black"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <EyeOff size={16} />
              </button>
            </div>
          </div>

          <Button className="w-full bg-blue-600 py-6 text-base font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200">
            Acceder al Sistema
          </Button>
        </form>

        <footer className="mt-8 text-center border-t pt-6">
          <p className="text-xs text-slate-400">
            &copy; 2024 Sistema de Gestión Automotriz. Todos los derechos
            reservados.
          </p>
        </footer>
      </Card>
    </div>
  );
}
