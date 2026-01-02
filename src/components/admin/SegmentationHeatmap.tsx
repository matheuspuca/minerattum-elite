import { useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Lead } from "./types";

interface SegmentationHeatmapProps {
  leads: Lead[];
}

const sourceLabels: Record<string, string> = {
  website: "Website",
  contact_form: "Formulário",
  diesel_ebook: "E-book Diesel",
  smartdrill_trial: "SmartDrill Trial",
  newsletter: "Newsletter",
  demo_request: "Demo",
};

const sourceColors: Record<string, string> = {
  website: "hsl(201, 79%, 46%)",
  contact_form: "hsl(38, 92%, 50%)",
  diesel_ebook: "hsl(160, 84%, 39%)",
  smartdrill_trial: "hsl(25, 95%, 53%)",
  newsletter: "hsl(280, 65%, 55%)",
  demo_request: "hsl(340, 75%, 55%)",
};

export const SegmentationHeatmap = ({ leads }: SegmentationHeatmapProps) => {
  const chartData = useMemo(() => {
    const sourceCounts = leads.reduce((acc, lead) => {
      const source = lead.source || "website";
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const total = leads.length || 1;

    return Object.entries(sourceCounts).map(([source, count]) => ({
      source,
      name: sourceLabels[source] || source,
      count,
      percentage: Math.round((count / total) * 100),
      fill: sourceColors[source] || "hsl(200, 70%, 50%)",
    })).sort((a, b) => b.count - a.count);
  }, [leads]);

  if (leads.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-foreground">Leads por Fonte</h3>
            <p className="text-sm text-muted-foreground">Distribuição de origem dos leads</p>
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
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Leads por Fonte</h3>
          <p className="text-sm text-muted-foreground">Distribuição de origem dos leads</p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }}>
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              width={120}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value: number) => [`${value} leads`, "Total"]}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend with percentages */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {chartData.map((item, index) => (
          <motion.div
            key={item.source}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-center justify-between p-2 rounded-lg"
            style={{ backgroundColor: `${item.fill}10` }}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-xs text-foreground">{item.name}</span>
            </div>
            <span className="text-xs font-medium" style={{ color: item.fill }}>
              {item.percentage}%
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
