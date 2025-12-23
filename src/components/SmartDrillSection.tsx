import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Target, Gauge, Database, TrendingUp, Drill } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SmartDrillSection = () => {
  return (
    <section id="smartdrill" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container relative z-10 px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Drill className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Produto Principal</span>
            </div>

            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
              SmartDrill <span className="text-gradient-gold">Pro</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-6">
              O SaaS definitivo para perfuração de rocha e desmonte com explosivos.
            </p>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Otimize suas operações de perfuração com inteligência artificial avançada. 
              O SmartDrill Pro oferece análise em tempo real, relatórios automatizados e 
              integração completa com equipamentos de campo para máxima eficiência operacional.
            </p>

            {/* Feature List */}
            <ul className="space-y-3 mb-10">
              {[
                "Análise preditiva de desempenho de perfuração",
                "Integração com sensores IoT em tempo real",
                "Dashboards customizáveis e relatórios automáticos",
                "Conformidade com normas de segurança NR-22"
              ].map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3 text-foreground/90"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  {feature}
                </motion.li>
              ))}
            </ul>

            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 rounded-xl group"
            >
              Explorar o SmartDrill
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* App Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            {/* Glow behind card */}
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-3xl" />
            
            {/* Main Dashboard Card */}
            <div className="relative glass-card rounded-2xl p-6 glow-gold">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                    <Drill className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground">SmartDrill Pro</h4>
                    <p className="text-xs text-muted-foreground">Dashboard Principal</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-primary/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Furos Hoje", value: "847", icon: Target, change: "+12%" },
                  { label: "Eficiência", value: "94.2%", icon: Gauge, change: "+3.1%" },
                  { label: "Tempo Médio", value: "4.2min", icon: TrendingUp, change: "-8%" },
                ].map((stat, i) => (
                  <div key={i} className="bg-secondary/50 rounded-xl p-4">
                    <stat.icon className="w-5 h-5 text-primary mb-2" />
                    <p className="text-2xl font-heading font-bold text-foreground">{stat.value}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <span className="text-xs text-green-400">{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart Placeholder */}
              <div className="bg-secondary/30 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Performance Semanal</span>
                  </div>
                  <Database className="w-4 h-4 text-muted-foreground" />
                </div>
                {/* Simulated Bar Chart */}
                <div className="flex items-end justify-between gap-2 h-24">
                  {[60, 75, 45, 90, 70, 85, 95].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                      className="flex-1 bg-gradient-to-t from-primary/60 to-primary rounded-t-md"
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => (
                    <span key={day} className="text-xs text-muted-foreground">{day}</span>
                  ))}
                </div>
              </div>

              {/* Live Indicator */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">Dados atualizados em tempo real</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
