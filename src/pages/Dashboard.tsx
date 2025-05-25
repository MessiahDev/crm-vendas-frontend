export default function DashboardPage() {

  return (
    <div className="min-h-screen p-6 dark:bg-gray-900 dark:text-white bg-gray-100 text-gray-800">
      {/* Navbar */}
      <header className="max-w-7xl mx-auto rounded-xl flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-xl font-bold">CRM Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block">
            {new Date().toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
      </header>

      {/* Cards principais */}
      <main className="max-w-7xl mx-auto p-6 grid gap-6 md:grid-cols-3">
        <DashboardCard title="Clientes" value="24" description="novos este mês" />
        <DashboardCard title="Vendas" value="R$ 12.400" description="últimos 30 dias" />
        <DashboardCard title="Negócios em andamento" value="8" description="no funil" />
      </main>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  description
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="p-4 rounded-xl shadow-md bg-white dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
}
