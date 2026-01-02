import { useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Calendar, Building, Clock, Target, Percent } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  message: string | null;
  source: string | null;
  status?: string | null;
  created_at: string;
}

interface AnalyticsDashboardProps {
  leads: Lead[];
}

const COLORS = ["hsl(200, 80%, 50%)", "hsl(160, 70%, 45%)", "hsl(280, 65%, 55%)", "hsl(340, 75%, 55%)", "hsl(45, 90%, 50%)"];
const STATUS_COLORS: Record<string, string> = {
  new: "hsl(200, 80%, 50%)",
  contacted: "hsl(45, 90%, 50%)",
  qualified: "hsl(160, 70%, 45%)",
  proposal: "hsl(280, 65%, 55%)",
  closed: "hsl(120, 70%, 45%)",
  lost: "hsl(0, 70%, 50%)",
};

const STATUS_LABELS: Record<string, string> = {
  new: "Novo",
  contacted: "Contatado",
  qualified: "Qualificado",
  proposal: "Proposta",
  closed: "Fechado",
  lost: "Perdido",
};

const AnalyticsDashboard = ({ leads }: AnalyticsDashboardProps) => {
  // Leads por dia (últimos 30 dias)
  const leadsPerDay = useMemo(() => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toISOString().split("T")[0];
    });

    const counts = leads.reduce((acc, lead) => {
      const date = lead.created_at.split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return last30Days.map((date) => ({
      date: new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      leads: counts[date] || 0,
    }));
  }, [leads]);

  // Leads por fonte
  const leadsBySource = useMemo(() => {
    const sources = leads.reduce((acc, lead) => {
      const source = lead.source || "Website";
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(sources).map(([name, value]) => ({ name, value }));
  }, [leads]);

  // Leads por status
  const leadsByStatus = useMemo(() => {
    const statuses = leads.reduce((acc, lead) => {
      const status = lead.status || "new";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statuses).map(([status, count]) => ({
      name: STATUS_LABELS[status] || status,
      value: count,
      status,
    }));
  }, [leads]);

  // Taxa de conversão por fonte
  const conversionBySource = useMemo(() => {
    const sourceStats = leads.reduce((acc, lead) => {
      const source = lead.source || "Website";
      if (!acc[source]) {
        acc[source] = { total: 0, closed: 0 };
      }
      acc[source].total++;
      if (lead.status === "closed") {
        acc[source].closed++;
      }
      return acc;
    }, {} as Record<string, { total: number; closed: number }>);

    return Object.entries(sourceStats).map(([source, stats]) => ({
      source,
      total: stats.total,
      closed: stats.closed,
      rate: stats.total > 0 ? Math.round((stats.closed / stats.total) * 100) : 0,
    }));
  }, [leads]);

  // Tempo médio de conversão (dias até fechamento)
  const avgConversionTime = useMemo(() => {
    const closedLeads = leads.filter(l => l.status === "closed");
    if (closedLeads.length === 0) return 0;

    // Simulando tempo médio baseado na diferença entre created_at e uma data estimada
    // Em um cenário real, você teria um campo closed_at
    const now = new Date();
    const totalDays = closedLeads.reduce((sum, lead) => {
      const createdDate = new Date(lead.created_at);
      const daysDiff = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
      return sum + Math.min(daysDiff, 30); // Cap em 30 dias
    }, 0);

    return Math.round(totalDays / closedLeads.length);
  }, [leads]);

  // Leads com empresa vs sem empresa
  const leadsWithCompany = useMemo(() => {
    const withCompany = leads.filter((l) => l.company).length;
    const withoutCompany = leads.length - withCompany;
    return [
      { name: "Com Empresa", value: withCompany },
      { name: "Sem Empresa", value: withoutCompany },
    ];
  }, [leads]);

  // Leads por mês
  const leadsByMonth = useMemo(() => {
    const months = leads.reduce((acc, lead) => {
      const month = new Date(lead.created_at).toLocaleDateString("pt-BR", { month: "short", year: "2-digit" });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(months)
      .map(([month, count]) => ({ month, count }))
      .slice(-6);
  }, [leads]);

  // Estatísticas
  const stats = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() - 7);
    
    const todayLeads = leads.filter((l) => l.created_at.startsWith(today)).length;
    const weekLeads = leads.filter((l) => new Date(l.created_at) >= thisWeek).length;
    const closedLeads = leads.filter((l) => l.status === "closed").length;
    const conversionRate = leads.length > 0 ? ((closedLeads / leads.length) * 100).toFixed(1) : 0;

    return {
      total: leads.length,
      today: todayLeads,
      week: weekLeads,
      conversionRate,
      avgConversionTime,
      closedLeads,
    };
  }, [leads, avgConversionTime]);

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="bg-card/50 border border-border/50 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          <p className="text-sm text-muted-foreground">Total de Leads</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card/50 border border-border/50 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.today}</p>
          <p className="text-sm text-muted-foreground">Leads Hoje</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card/50 border border-border/50 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.week}</p>
          <p className="text-sm text-muted-foreground">Leads na Semana</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card/50 border border-border/50 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.closedLeads}</p>
          <p className="text-sm text-muted-foreground">Leads Fechados</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card/50 border border-border/50 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <Percent className="w-5 h-5 text-orange-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.conversionRate}%</p>
          <p className="text-sm text-muted-foreground">Taxa Conversão</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card/50 border border-border/50 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.avgConversionTime}d</p>
          <p className="text-sm text-muted-foreground">Tempo Médio</p>
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Leads Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card/50 border border-border/50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Leads por Dia (30 dias)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={leadsPerDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={10}
                  tickLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Line
                  type="monotone"
                  dataKey="leads"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 0, r: 3 }}
                  activeDot={{ r: 5, fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Leads by Status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card/50 border border-border/50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Leads por Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadsByStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {leadsByStatus.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={STATUS_COLORS[entry.status] || COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Conversion by Source */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card/50 border border-border/50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Taxa de Conversão por Fonte</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionBySource} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  type="number" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickLine={false}
                  unit="%"
                />
                <YAxis 
                  type="category"
                  dataKey="source" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number, name: string) => [
                    name === "rate" ? `${value}%` : value,
                    name === "rate" ? "Conversão" : name === "total" ? "Total" : "Fechados"
                  ]}
                />
                <Bar dataKey="rate" fill="hsl(160, 70%, 45%)" radius={[0, 4, 4, 0]} name="Taxa %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Leads by Source */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-card/50 border border-border/50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Leads por Fonte</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadsBySource}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {leadsBySource.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Charts Row 3 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Leads by Month */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-card/50 border border-border/50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Leads por Mês</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadsByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Company Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-card/50 border border-border/50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Leads com Empresa</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadsWithCompany}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                >
                  <Cell fill="hsl(160, 70%, 45%)" />
                  <Cell fill="hsl(var(--muted))" />
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
