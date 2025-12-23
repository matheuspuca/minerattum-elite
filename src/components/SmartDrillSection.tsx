import { motion } from "framer-motion";
import { ArrowRight, Drill, Activity, Layers, Gauge, TrendingDown, Mountain, Circle, AlertTriangle, Target, Shield, DollarSign } from "lucide-react";
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

const solutionCards = [
  {
    icon: Target,
    title: "QA/QC em Tempo Real",
    description: "Compare planejado vs. executado e corrija desvios antes do carregamento.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: DollarSign,
    title: "Redução de Custo",
    description: "Otimize a razão de carga e economize explosivos com dados precisos da malha.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Shield,
    title: "Segurança & Compliance",
    description: "Operação alinhada às normas de SST e controle rigoroso de dados.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

export const SmartDrillSection = () => {
  return (
    <section id="smartdrill" className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-background to-muted/50">
      <div className="container relative z-10 px-4">
        {/* Main Headline Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Drill className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">SmartDrill Pro</span>
          </div>

          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-6 text-foreground leading-tight">
            A <span className="text-gradient-gold">Precisão Cirúrgica</span> que seu Desmonte de Rochas Exige.
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforme dados de perfuração em inteligência geotécnica. Garanta a fragmentação ideal e reduza o custo operacional (OPEX) do desmonte.
          </p>
        </motion.div>

        {/* Problem Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-16"
        >
          <div className="relative bg-foreground/5 border border-border/50 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto">
            <div className="absolute -top-4 left-6 md:left-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 border border-destructive/20">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <span className="text-sm font-medium text-destructive">Você ainda opera no escuro?</span>
              </div>
            </div>
            
            <p className="text-muted-foreground pt-4 text-base md:text-lg leading-relaxed">
              Planejamento e execução raramente andam juntos. <span className="text-foreground font-medium">Desvios de furos não detectados</span>, sobrecarga de explosivos para compensar erros e <span className="text-foreground font-medium">planilhas manuais</span> geram ineficiência, repé e riscos operacionais desnecessários.
            </p>
          </div>
        </motion.div>

        {/* Solution Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {solutionCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="group relative bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2 text-foreground">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Dashboard + Authority Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Dark Mode Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative order-2 lg:order-1"
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
                  { label: "Dureza Média", value: "72 MPa", icon: Mountain, color: "text-accent" },
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
                    <span className="text-sm font-medium text-white">Planejado vs Executado</span>
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
                        <stop offset="0%" stopColor="hsl(210, 100%, 50%)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="hsl(210, 100%, 50%)" stopOpacity="0" />
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
                      stroke="hsl(210, 100%, 50%)"
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

          {/* Authority Section + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Selo Minerattum</span>
            </div>

            <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4 text-foreground">
              Desenvolvido por quem <span className="text-gradient-gold">entende de rocha</span>.
            </h3>
            
            <p className="text-muted-foreground mb-6 leading-relaxed text-base md:text-lg">
              O SmartDrill não é apenas um software de TI. É uma ferramenta forjada pela engenharia de minas, com o selo de qualidade e segurança (SST) da Minerattum.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Integração nativa com sua operação atual",
                "Suporte técnico especializado em mineração",
                "Atualizações contínuas baseadas em feedback do campo"
              ].map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3 text-foreground/90"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  {feature}
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 rounded-xl group"
              >
                Agendar Demo Técnica
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-sm text-muted-foreground self-center">
                Integração nativa com sua operação atual.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};