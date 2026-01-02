import { motion } from "framer-motion";
import { ArrowDown, TrendingDown } from "lucide-react";
import { FunnelStep } from "./types";

interface FunnelAnalyticsProps {
  steps: FunnelStep[];
}

export const FunnelAnalytics = ({ steps }: FunnelAnalyticsProps) => {
  const maxCount = Math.max(...steps.map((s) => s.count));

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

      <div className="space-y-2">
        {steps.map((step, index) => {
          const width = (step.count / maxCount) * 100;
          const isLast = index === steps.length - 1;
          
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
                  className={`relative h-14 rounded-lg flex items-center justify-between px-4 ${
                    isLast 
                      ? "bg-gradient-to-r from-emerald/20 to-emerald/10 border border-emerald/30" 
                      : "bg-gradient-to-r from-primary/20 to-primary/5"
                  }`}
                  style={{ width: `${Math.max(width, 30)}%` }}
                >
                  <span className="text-sm font-medium text-foreground">{step.name}</span>
                  <span className={`text-lg font-bold ${isLast ? "text-emerald" : "text-primary"}`}>
                    {step.count}
                  </span>
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

      {/* Conversion Summary */}
      <div className="mt-6 p-4 bg-emerald/10 border border-emerald/20 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Taxa de Conversão Total</span>
          <span className="text-xl font-bold text-emerald">
            {steps.length > 0 
              ? ((steps[steps.length - 1].count / steps[0].count) * 100).toFixed(1) 
              : 0}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};
