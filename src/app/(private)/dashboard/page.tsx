export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-[28px] bg-slate-950 px-6 py-8 text-white shadow-xl shadow-slate-950/10">
        <p className="text-sm uppercase tracking-[0.22em] text-amber-300">Resumen</p>
        <h1 className="mt-3 text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">
          El layout privado ahora consume los modulos entregados por el backend durante el login para construir la navegacion lateral.
        </p>
      </div>
    </section>
  );
}
