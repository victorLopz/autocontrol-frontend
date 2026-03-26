'use client';

import { useState } from 'react';
import { Card } from '@//shared/presentation/components/ui/card';
import { Input } from '@//shared/presentation/components/ui/input';
import { Button } from '@//shared/presentation/components/ui/button';
import { selectAuthError, selectAuthLoading } from '@//store/selectors/auth';
import { useAppSelector } from '@//store/hooks';
import { Car, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import FormWrapper from '@//shared/presentation/components/ui/form-wrapper';
import useFormActions from '@/hooks/use-form-actions';

export function LoginView() {
  const formActions = useFormActions();
  const isLoading = useAppSelector(selectAuthLoading);
  const authError = useAppSelector(selectAuthError);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (field: 'email' | 'password', value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await formActions.execute({
      action: 'LOGIN',
      values: formData,
    });
  };

  return (
    <FormWrapper>
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-zinc-950">
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none overflow-hidden">
          <Car className="absolute -left-10 -bottom-10 w-64 h-64 rotate-12" />
        </div>

        <Card className="z-10 w-full max-w-md border-t-4 border-t-blue-600 p-8 shadow-xl">
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <Car size={28} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Sistema de Gestión Automotriz</h1>
            <p className="text-sm text-slate-800">Lubricentro Los 2 Hermanos</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm text-black font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-black" />
                <Input
                  type="email"
                  placeholder="nombre@taller.com"
                  value={formData.email}
                  onChange={(event) => handleChange('email', event.target.value)}
                  disabled={isLoading}
                  className="pl-10 focus-visible:ring-blue-600 text-black"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium leading-none text-black">Contraseña</label>
                <button type="button" className="text-xs text-blue-600 hover:underline">
                  ¿Olvidaste tu clave?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-black" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(event) => handleChange('password', event.target.value)}
                  disabled={isLoading}
                  className="pl-10 focus-visible:ring-blue-600 text-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>

            {authError ? <p className="text-sm text-red-600">{authError}</p> : null}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 py-6 text-base font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200"
            >
              {isLoading ? 'Ingresando...' : 'Acceder al Sistema'}
            </Button>
          </form>

          <footer className="mt-8 text-center border-t pt-6">
            <p className="text-xs text-slate-400">&copy; 2024 Sistema de Gestión Automotriz. Todos los derechos reservados.</p>
          </footer>
        </Card>
      </div>
    </FormWrapper>
  );
}
