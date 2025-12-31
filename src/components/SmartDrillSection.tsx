import { motion } from "framer-motion";
import { ArrowRight, Drill, Activity, Layers, Gauge, TrendingDown, Mountain, Circle, Zap, LayoutDashboard, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const depthData = [
  { depth: 0, hardness: 45 },
  { depth: 2, hardness: 52 },
  { depth: 4, hardness: 68 },
  { depth: 6, hardness: 75 },
  { depth: 8, hardness: 62 },
  { depth: 10, hardness: 85 },
  { depth: 12, hardness: 78 },
  { depth: 14, hardness: 92 },
];

const drillLogs = [
  { id: "FU-2847", depth: "14.2m", status: "complete", time: "4:32" },
  { id: "FU-2848", depth: "8.7m", status: "drilling", time: "2:15" },
  { id: "FU-2849", depth: "0.0m", status: "pending", time: "--:--" },
];

const features = [
  {
    icon: LayoutDashboard,
    title: "Dashboard Elite",
    description: "KPIs e Business Intelligence em tempo real para decisões estratégicas.",
  },
  {
    icon: Gauge,
    title: "Apontamentos Diários",
    description: "Registro simplificado de perfuração que alimenta automaticamente o sistema.",
  },
  {
    icon: FileText,
    title: "Gestão de Custos",
    description: "Controle total de Capex e Opex com análises detalhadas por operação.",
  },
];

export const SmartDrillSection = () => {
  return (
    <section id="smartdrill" className="relative py-24 md:py-32 overflow-hidden bg-background">
      {/* Subtle background */}
      <div className="absolute inset-0 topography-bg opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />

      <div className="container relative z-10 px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Produto Principal</span>
          </div>

          <h2 className="font-semibold text-3xl md:text-4xl lg:text-5xl mb-4 text-foreground leading-tight tracking-tight">
            SmartDrill
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground">
            SaaS de gerenciamento de custos e tomada de decisões para perfuração de rochas.
          </p>
        </motion.div>

        {/* Main Content: Dashboard + Features */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Dashboard Mockup - Takes 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotateY: 10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3 relative perspective-1000"
          >
            <div className="absolute -inset-4 bg-primary/8 blur-3xl rounded-3xl" />
            
            {/* 3D Tilt Effect Container */}
            <div className="relative transform lg:rotate-y-2 lg:hover:rotate-y-0 transition-transform duration-500">
              <div className="relative glass-card-dark rounded-2xl p-5 shadow-2xl overflow-hidden border border-primary/10">
                {/* Header */}
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-primary/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                      <Drill className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">SmartDrill Pro</h4>
                      <p className="text-xs text-muted-foreground">Bancada Norte - Turno A</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-green-400 font-medium">Live</span>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-4 gap-3 mb-5">
                  {[
                    { label: "Furos", value: "127", icon: Circle, color: "text-primary" },
                    { label: "Prof. Média", value: "12.4m", icon: TrendingDown, color: "text-emerald-400" },
                    { label: "Dureza Média", value: "72 MPa", icon: Mountain, color: "text-accent" },
                    { label: "Eficiência", value: "94%", icon: Gauge, color: "text-primary" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-muted/50 rounded-lg p-3 border border-border/50">
                      <stat.icon className={`w-4 h-4 ${stat.color} mb-1.5`} />
                      <p className="text-lg font-semibold text-foreground">{stat.value}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Main Chart - Depth vs Hardness */}
                <div className="bg-muted/30 rounded-xl p-4 mb-4 border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">Planejado vs Executado</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /> Dureza (MPa)</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary/40" /> Profundidade</span>
                    </div>
                  </div>
                  
                  {/* Chart Area */}
                  <div className="relative h-32">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between">
                      {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="border-t border-border/30 w-full" />
                      ))}
                    </div>
                    
                    {/* Area Chart */}
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="hardnessGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(210, 100%, 52%)" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="hsl(210, 100%, 52%)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        d={`M 0 ${128 - (depthData[0].hardness / 100) * 128} ${depthData.map((d, i) => `L ${(i / (depthData.length - 1)) * 100}% ${128 - (d.hardness / 100) * 128}`).join(' ')} L 100% 128 L 0 128 Z`}
                        fill="url(#hardnessGradient)"
                      />
                      <motion.path
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        d={`M 0 ${128 - (depthData[0].hardness / 100) * 128} ${depthData.map((d, i) => `L ${(i / (depthData.length - 1)) * 100}% ${128 - (d.hardness / 100) * 128}`).join(' ')}`}
                        fill="none"
                        stroke="hsl(210, 100%, 52%)"
                        strokeWidth="2"
                      />
                    </svg>

                    {/* Data Points */}
                    <div className="absolute inset-0 flex justify-between items-end px-1">
                      {depthData.map((d, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
                          className="flex flex-col items-center"
                          style={{ marginBottom: `${(d.hardness / 100) * 128 - 8}px` }}
                        >
                          <div className="w-2 h-2 rounded-full bg-primary border-2 border-background" />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* X Axis Labels */}
                  <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                    {depthData.filter((_, i) => i % 2 === 0).map((d) => (
                      <span key={d.depth}>{d.depth}m</span>
                    ))}
                  </div>
                </div>

                {/* Live Drill Log */}
                <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Log de Furos em Tempo Real</span>
                  </div>
                  <div className="space-y-2">
                    {drillLogs.map((log, i) => (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 + i * 0.15, duration: 0.4 }}
                        className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-muted-foreground">{log.id}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                            log.status === 'complete' ? 'bg-emerald-500/20 text-emerald-400' :
                            log.status === 'drilling' ? 'bg-primary/20 text-primary' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {log.status === 'complete' ? 'Completo' : log.status === 'drilling' ? 'Perfurando' : 'Aguardando'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-muted-foreground">{log.depth}</span>
                          <span className="font-mono text-muted-foreground/60">{log.time}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features List - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                className="flex gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="pt-4"
            >
              <Button 
                size="lg" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base rounded-xl group"
              >
                Ver Funcionalidades
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
