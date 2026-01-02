import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TopicInterest } from "./types";

interface SegmentationHeatmapProps {
  data: TopicInterest[];
}

const topicLabels: Record<string, string> = {
  drilling: "Perfuração",
  blasting: "Desmonte",
  ia: "Inteligência Artificial",
  diesel: "Diesel/Combustíveis",
};

const topicColors: Record<string, string> = {
  drilling: "hsl(201, 79%, 46%)",
  blasting: "hsl(38, 92%, 50%)",
  ia: "hsl(160, 84%, 39%)",
  diesel: "hsl(25, 95%, 53%)",
};

export const SegmentationHeatmap = ({ data }: SegmentationHeatmapProps) => {
  const chartData = data.map((item) => ({
    ...item,
    name: topicLabels[item.topic] || item.topic,
    fill: topicColors[item.topic],
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Segmentation Heatmap</h3>
          <p className="text-sm text-muted-foreground">Interesses por tópico</p>
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
              formatter={(value: number) => [`${value} leads`, "Interesse"]}
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
            key={item.topic}
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
