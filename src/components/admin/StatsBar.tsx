import { motion } from "framer-motion";
import { Users, Play, BookOpen, TrendingUp } from "lucide-react";

interface StatsBarProps {
  newLeadsToday: number;
  activeTrials: number;
  ebookDownloads: number;
  conversionRate: number;
}

export const StatsBar = ({ 
  newLeadsToday, 
  activeTrials, 
  ebookDownloads, 
  conversionRate 
}: StatsBarProps) => {
  const stats = [
    {
      label: "New Leads (Today)",
      value: newLeadsToday,
      icon: Users,
      color: "primary",
      bgColor: "bg-primary/10",
      textColor: "text-primary",
    },
    {
      label: "Active Trials (SmartDrill)",
      value: activeTrials,
      icon: Play,
      color: "emerald",
      bgColor: "bg-emerald/10",
      textColor: "text-emerald",
    },
    {
      label: "eBook Downloads",
      value: ebookDownloads,
      icon: BookOpen,
      color: "amber",
      bgColor: "bg-amber/10",
      textColor: "text-amber",
    },
    {
      label: "Conversion Rate",
      value: `${conversionRate}%`,
      icon: TrendingUp,
      color: "emerald",
      bgColor: "bg-emerald/10",
      textColor: "text-emerald",
      isPercentage: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all group"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.textColor}`}>
                {stat.value}
              </p>
            </div>
            <div className={`${stat.bgColor} p-3 rounded-lg transition-transform group-hover:scale-110`}>
              <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
