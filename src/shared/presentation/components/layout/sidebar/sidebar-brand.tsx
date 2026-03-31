import { CarFront } from "lucide-react";

export function SidebarBrand() {
  return (
    <div className="border-b border-slate-800 px-5 py-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-300 ring-1 ring-amber-300/20">
          <CarFront className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Lubricentro Los 2 Hermanos</p>
          <p className="text-xs text-slate-400">Panel operativo</p>
        </div>
      </div>
    </div>
  );
}
