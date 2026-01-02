import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowDown, TrendingDown, TrendingUp, Target, Users, Zap } from "lucide-react";
import { Lead, LeadStatus } from "./types";

interface FunnelAnalyticsProps {
  leads: Lead[];
}

const STATUS_ORDER: LeadStatus[] = ["new", "contacted", "negotiation", "closed"];
const STATUS_LABELS: Record<string, string> = {
  new: "Novo Lead",
  contacted: "Contatado",
  negotiation: "Em Negociação",
  closed: "Fechado",
};

export const FunnelAnalytics = ({ leads }: FunnelAnalyticsProps) => {
  const funnelData = useMemo(() => {
    const statusCounts = leads.reduce((acc, lead) => {
      const status = lead.status || "new";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate cumulative counts for funnel
    // For a sales funnel, we need to calculate how many leads have progressed to each stage or beyond
    const cumulativeCounts = STATUS_ORDER.map((status, index) => {
      // Count leads at this stage or any later stage
      const count = STATUS_ORDER.slice(index).reduce((sum, s) => sum + (statusCounts[s] || 0), 0);
      return { status, count };
    });

    return cumulativeCounts.map((item, index) => {
      const prevCount = index > 0 ? cumulativeCounts[index - 1].count : leads.length;
      const dropoff = prevCount > 0 ? Math.round(((prevCount - item.count) / prevCount) * 100) : 0;
      
      return {
        name: STATUS_LABELS[item.status],
        status: item.status,
        count: item.count,
        actualCount: statusCounts[item.status] || 0,
        dropoff: index === 0 ? 0 : dropoff,
      };
    });
  }, [leads]);

  const maxCount = Math.max(...funnelData.map((s) => s.count), 1);
  
  const totalConversion = useMemo(() => {
    if (leads.length === 0) return 0;
    const closed = leads.filter(l => l.status === "closed").length;
    return (closed / leads.length) * 100;
  }, [leads]);
  
  const avgDropoff = useMemo(() => {
    const dropoffs = funnelData.filter(s => s.dropoff > 0);
    if (dropoffs.length === 0) return 0;
    return dropoffs.reduce((acc, s) => acc + s.dropoff, 0) / dropoffs.length;
  }, [funnelData]);

  const bestStep = useMemo(() => {
    return funnelData.reduce((best, step, index) => {
      if (index === 0) return best;
      const retentionRate = 100 - step.dropoff;
      if (retentionRate > best.rate) {
        return { name: step.name, rate: retentionRate, index };
      }
      return best;
    }, { name: "", rate: 0, index: 0 });
  }, [funnelData]);

  const worstStep = useMemo(() => {
    return funnelData.reduce((worst, step, index) => {
      if (index === 0 || step.dropoff === 0) return worst;
      if (step.dropoff > worst.rate) {
        return { name: step.name, rate: step.dropoff, index };
      }
      return worst;
    }, { name: "", rate: 0, index: 0 });
  }, [funnelData]);

  if (leads.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-foreground">Análise de Funil</h3>
            <p className="text-sm text-muted-foreground">Da captura à conversão</p>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          Nenhum lead cadastrado
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-card border border-border rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Análise de Funil</h3>
          <p className="text-sm text-muted-foreground">Da captura à conversão</p>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Total Leads</span>
          </div>
          <span className="text-lg font-bold text-foreground">{leads.length}</span>
        </div>
        
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-emerald-500" />
            <span className="text-xs text-muted-foreground">Conversões</span>
          </div>
          <span className="text-lg font-bold text-foreground">
            {leads.filter(l => l.status === "closed").length}
          </span>
        </div>
        
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-muted-foreground">Taxa Conversão</span>
          </div>
          <span className="text-lg font-bold text-foreground">{totalConversion.toFixed(0)}%</span>
        </div>
        
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="w-4 h-4 text-destructive" />
            <span className="text-xs text-muted-foreground">Abandono Médio</span>
          </div>
          <span className="text-lg font-bold text-foreground">{avgDropoff.toFixed(0)}%</span>
        </div>
      </div>

      {/* Funnel Visualization */}
      <div className="space-y-2 mb-6">
        {funnelData.map((step, index) => {
          const width = (step.count / maxCount) * 100;
          const isLast = index === funnelData.length - 1;
          const stepConversion = index > 0 && funnelData[index - 1].count > 0
            ? ((step.count / funnelData[index - 1].count) * 100).toFixed(0)
            : "100";
          
          return (
            <div key={step.name}>
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative"
                style={{ originX: 0 }}
              >
                <div
                  className={`relative h-16 rounded-lg flex items-center justify-between px-4 ${
                    isLast 
                      ? "bg-gradient-to-r from-emerald-500/20 to-emerald-500/10 border border-emerald-500/30" 
                      : "bg-gradient-to-r from-primary/20 to-primary/5"
                  }`}
                  style={{ width: `${Math.max(width, 35)}%` }}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{step.name}</span>
                    {index > 0 && (
                      <span className="text-xs text-muted-foreground">
                        {stepConversion}% da etapa anterior
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-lg font-bold ${isLast ? "text-emerald-500" : "text-primary"}`}>
                      {step.count}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({step.actualCount} nesta etapa)
                    </span>
                  </div>
                </div>
              </motion.div>
              
              {!isLast && step.dropoff > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                  className="flex items-center gap-2 py-2 pl-4"
                >
                  <ArrowDown className="w-4 h-4 text-muted-foreground" />
                  <div className="flex items-center gap-1 text-xs text-destructive">
                    <TrendingDown className="w-3 h-3" />
                    <span>-{step.dropoff}% de abandono</span>
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Insights Section */}
      <div className="space-y-3">
        {bestStep.name && bestStep.rate > 0 && (
          <div className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <div className="p-2 bg-emerald-500/20 rounded-full">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium text-foreground">Melhor Etapa</span>
              <p className="text-xs text-muted-foreground">
                "{bestStep.name}" tem {bestStep.rate.toFixed(0)}% de retenção
              </p>
            </div>
          </div>
        )}

        {worstStep.name && worstStep.rate > 0 && (
          <div className="flex items-center gap-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="p-2 bg-destructive/20 rounded-full">
              <Zap className="w-4 h-4 text-destructive" />
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium text-foreground">Oportunidade de Melhoria</span>
              <p className="text-xs text-muted-foreground">
                "{worstStep.name}" perde {worstStep.rate}% dos leads - foco de otimização
              </p>
            </div>
          </div>
        )}

        {/* Total Conversion Summary */}
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Taxa de Conversão Total</span>
            <span className="text-xl font-bold text-emerald-500">
              {totalConversion.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(totalConversion, 100)}%` }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="bg-emerald-500 h-2 rounded-full"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            De {leads.length} leads capturados, {leads.filter(l => l.status === "closed").length} converteram em clientes
          </p>
        </div>
      </div>
    </motion.div>
  );
};
