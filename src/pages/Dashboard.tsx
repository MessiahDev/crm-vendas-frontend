import { useEffect, useState } from 'react';
import { faChartLine, faUserPlus, faHandshake, faUsers, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CustomerService } from '../services/CustomerService';
import { LeadService } from '../services/LeadService';
import { DealService } from '../services/DealService';
import { InteractionService } from '../services/InteractionService';

import type { Customer } from '../models/Customer';
import type { Lead } from '../models/Lead';
import type { Deal } from '../models/Deal';
import type { Interaction } from '../models/Interaction';
import { DealStage } from '../models/enums/DealStage';

export default function DashboardPage() {
  const [customerCount, setCustomerCount] = useState<number>(0);
  const [leadCount, setLeadCount] = useState<number>(0);
  const [dealsInProgress, setDealsInProgress] = useState<number>(0);
  const [salesTotal, setSalesTotal] = useState<number>(0);
  const [funnelData, setFunnelData] = useState<Record<string, number>>({});
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [recentActivities, setRecentActivities] = useState<Interaction[]>([]);
  const [topCustomers, setTopCustomers] = useState<{ nome: string; valor: number }[]>([]);

  useEffect(() => {
    async function loadData() {
      const customers: Customer[] = await CustomerService.getAll();
      setCustomerCount(customers.length);

      const leads: Lead[] = await LeadService.getAll();
      setLeadCount(leads.length);
      setRecentLeads(
        leads
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 3)
      );

      const deals: Deal[] = await DealService.getAll();
      const inProgress = deals.filter(d =>
        d.stage === DealStage.Novo ||
        d.stage === DealStage.Negociacao ||
        d.stage === DealStage.PropostaEnviada
      );
      const won = deals.filter(d => d.stage === 3);
      setDealsInProgress(inProgress.length);
      setSalesTotal(won.reduce((sum, d) => sum + (d.value ?? 0), 0));

      setFunnelData({
        'Novo': deals.filter(d => d.stage === DealStage.Novo).length,
        'Negociação': deals.filter(d => d.stage === DealStage.Negociacao).length,
        'Proposta enviada': deals.filter(d => d.stage === DealStage.PropostaEnviada).length,
        'Fechado (ganho)': won.length,
      });

      const interactions: Interaction[] = await InteractionService.getAll();
      const recent = interactions
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);
      setRecentActivities(recent);

      const customerSales: Record<string, number> = {};
      won.forEach(deal => {
        const nome = deal.customerName ?? 'Desconhecido';
        customerSales[nome] = (customerSales[nome] || 0) + (deal.value ?? 0);
      });

      const top = Object.entries(customerSales)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([nome, valor]) => ({ nome, valor }));

      setTopCustomers(top);
    }

    loadData();
  }, []);

  return (
    <div className="min-h-screen p-6 dark:bg-gray-900 dark:text-white bg-gray-100 text-gray-800">
      <header className="max-w-7xl mx-auto rounded-xl flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-xl font-bold">Dashboard</h1>
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

      <main className="max-w-7xl mx-auto p-6 grid gap-6 md:grid-cols-4">
        <DashboardCard title="Clientes" value={customerCount.toString()} description="novos este mês" icon={faUsers} />
        <DashboardCard title="Leads" value={leadCount.toString()} description="captados recentemente" icon={faUserPlus} />
        <DashboardCard title="Negócios em andamento" value={dealsInProgress.toString()} description="no funil" icon={faHandshake} />
        <DashboardCard title="Vendas" value={`R$ ${salesTotal.toLocaleString('pt-BR')}`} description="últimos 30 dias" icon={faChartLine} />
      </main>

      <section className="max-w-7xl mx-auto p-6 grid gap-6 md:grid-cols-2">
        <SectionCard title="Funil de Vendas">
          <ul className="space-y-2">
            {Object.entries(funnelData).map(([label, count]) => (
              <li key={label} className="flex justify-between">
                <span className="font-medium">{label}</span>
                <span>{count}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Últimos Leads">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentLeads.map(lead => (
              <li key={lead.id} className="py-2 flex justify-between">
                <span>{lead.name}</span>
                <span className="text-sm text-gray-500">
                  {new Date(lead.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Atividades Recentes">
          <ul className="space-y-3">
            {recentActivities.map(activity => (
              <li key={activity.id} className="flex items-center gap-2">
                <FontAwesomeIcon icon={faClock} className="text-blue-500" />
                <span>
                  {activity.type} com {activity.customerName || activity.leadName} –{' '}
                  {new Date(activity.date).toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Top Clientes">
          <ul className="space-y-2">
            {topCustomers.map((c, i) => (
              <li key={i} className="flex justify-between items-center">
                <span>{c.nome}</span>
                <span className="text-sm text-gray-500">R$ {c.valor.toLocaleString('pt-BR')}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </section>
    </div>
  );
}

type CardProps = {
  title: string;
  value: string;
  description: string;
  icon: any;
};

function DashboardCard({ title, value, description, icon }: CardProps) {
  return (
    <div className="p-4 rounded-xl shadow-md bg-white dark:bg-gray-800 flex items-center gap-4">
      <div className="text-blue-600 dark:text-blue-400 text-3xl">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
