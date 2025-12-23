import { motion } from "framer-motion";
import { ArrowRight, Drill, Activity, Layers, Gauge, TrendingDown, Mountain, Circle } from "lucide-react";
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

export const SmartDrillSection = () => {
  return (
    <section id="smartdrill" className="relative py-24 md:py-32 overflow-hidden bg-muted/30">
      <div className="container relative z-10 px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Drill className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Produto Principal</span>
            </div>

            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-foreground">
              SmartDrill <span className="text-gradient-gold">Pro</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-6">
              O SaaS definitivo para perfuração de rocha e desmonte com explosivos.
            </p>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Monitore profundidade, dureza da rocha e performance em tempo real. 
              Nosso dashboard inteligente transforma dados brutos em insights acionáveis 
              para otimizar cada furo da sua operação.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                "Gráficos de profundidade vs dureza da rocha",
                "Monitoramento de penetração em tempo real",
                "Análise preditiva de desgaste de brocas",
                "Relatórios automáticos por turno e bancada"
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

          {/* Dark Mode Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-3xl" />
            
            <div className="relative glass-card-dark rounded-2xl p-5 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                    <Drill className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-white text-sm">SmartDrill Pro</h4>
                    <p className="text-xs text-white/50">Bancada Norte - Turno A</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-green-400">Live</span>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-3 mb-5">
                {[
                  { label: "Furos", value: "127", icon: Circle, color: "text-blue-400" },
                  { label: "Prof. Média", value: "12.4m", icon: TrendingDown, color: "text-emerald-400" },
                  { label: "Dureza Média", value: "72 MPa", icon: Mountain, color: "text-amber-400" },
                  { label: "Eficiência", value: "94%", icon: Gauge, color: "text-primary" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <stat.icon className={`w-4 h-4 ${stat.color} mb-1.5`} />
                    <p className="text-lg font-heading font-bold text-white">{stat.value}</p>
                    <p className="text-[10px] text-white/50 uppercase tracking-wide">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Main Chart - Depth vs Hardness */}
              <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-white">Profundidade vs Dureza da Rocha</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px]">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /> Dureza (MPa)</span>
                    <span className="flex items-center gap-1 text-white/50"><span className="w-2 h-2 rounded-full bg-blue-400" /> Profundidade</span>
                  </div>
                </div>
                
                {/* Chart Area */}
                <div className="relative h-32">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="border-t border-white/5 w-full" />
                    ))}
                  </div>
                  
                  {/* Area Chart */}
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="hardnessGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(32, 95%, 44%)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="hsl(32, 95%, 44%)" stopOpacity="0" />
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
                      stroke="hsl(32, 95%, 44%)"
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
                        <div className="w-2 h-2 rounded-full bg-primary border-2 border-white/20" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* X Axis Labels */}
                <div className="flex justify-between mt-2 text-[10px] text-white/40">
                  {depthData.filter((_, i) => i % 2 === 0).map((d) => (
                    <span key={d.depth}>{d.depth}m</span>
                  ))}
                </div>
              </div>

              {/* Live Drill Log */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-white">Log de Furos em Tempo Real</span>
                </div>
                <div className="space-y-2">
                  {drillLogs.map((log, i) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1 + i * 0.15, duration: 0.4 }}
                      className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-white/70">{log.id}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          log.status === 'complete' ? 'bg-emerald-500/20 text-emerald-400' :
                          log.status === 'drilling' ? 'bg-primary/20 text-primary' :
                          'bg-white/10 text-white/40'
                        }`}>
                          {log.status === 'complete' ? 'Completo' : log.status === 'drilling' ? 'Perfurando' : 'Aguardando'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-white/60">{log.depth}</span>
                        <span className="font-mono text-white/40">{log.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
