import { motion } from "framer-motion";
import { 
  Check, 
  ArrowRight, 
  Play, 
  Zap, 
  BarChart3, 
  Shield, 
  Clock, 
  MessageCircle,
  Star,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const pricingTiers = [
  {
    name: "Básico",
    price: "R$ 699,00",
    period: "/mês",
    description: "Ideal para operações menores",
    features: [
      "01 Equipamento/Perfuratriz",
      "01 Obra ativa",
      "Gerenciamento total de custos",
      "Suporte via E-mail",
    ],
    cta: "Assinar Básico",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "R$ 1.299,00",
    period: "/mês",
    description: "Para operações em crescimento",
    badge: "Recomendado",
    features: [
      "Até 03 Máquinas",
      "Até 03 Obras simultâneas",
      "Gerenciamento total de custos (Capex/Opex)",
      "Suporte Prioritário via E-mail",
    ],
    cta: "Assinar Pro",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Sob Consulta",
    period: "",
    description: "Para grandes operações",
    features: [
      "Equipamentos Ilimitados (conforme demanda)",
      "Obras Ilimitadas",
      "Gerenciamento Total + API Customizada",
      "Suporte Exclusivo via WhatsApp",
    ],
    cta: "Falar com Consultor",
    highlighted: false,
  },
];

const testimonials = [
  {
    name: "Carlos Mendes",
    role: "Gerente de Operações",
    company: "Pedreira São Paulo",
    quote: "Reduzimos 23% no consumo de explosivos no primeiro trimestre. O ROI foi imediato.",
    avatar: "CM",
  },
  {
    name: "Ana Paula Santos",
    role: "Engenheira de Minas",
    company: "Mineração Atlas",
    quote: "Finalmente temos dados confiáveis para tomar decisões. Acabou a era das planilhas manuais.",
    avatar: "AS",
  },
  {
    name: "Roberto Almeida",
    role: "Diretor Técnico",
    company: "Britagem Norte",
    quote: "A integração foi simples e o suporte técnico é excepcional. Recomendo sem ressalvas.",
    avatar: "RA",
  },
];

const faqs = [
  {
    question: "Funciona sem internet?",
    answer: "Sim, o app coleta dados offline e sincroniza automaticamente quando a conexão é restabelecida. Ideal para operações em áreas remotas.",
  },
  {
    question: "Serve para pequenas pedreiras?",
    answer: "Perfeito para otimizar custos desde a primeira máquina. O plano Básico foi desenhado especialmente para operações menores que querem profissionalizar a gestão.",
  },
  {
    question: "Qual o tempo de implementação?",
    answer: "A implementação básica leva de 3 a 5 dias úteis. Inclui treinamento da equipe e configuração inicial do sistema.",
  },
  {
    question: "Posso migrar de plano depois?",
    answer: "Sim, você pode fazer upgrade ou downgrade a qualquer momento. O valor é ajustado proporcionalmente no próximo ciclo de faturamento.",
  },
  {
    question: "Como funciona o suporte técnico?",
    answer: "Oferecemos suporte via e-mail para planos Básico e Pro, com resposta em até 24h úteis. O plano Enterprise conta com suporte exclusivo via WhatsApp.",
  },
];

export default function SmartDrill() {
  const whatsappLink = "https://wa.me/5573999473043?text=Olá! Gostaria de saber mais sobre o SmartDrill.";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="container px-4 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Software de Gestão de Perfuração</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              SmartDrill: O Fim do{" "}
              <span className="text-primary">Empirismo</span> no Desmonte de Rochas
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Gestão total de custos e produtividade com IA aplicada. Transforme dados de perfuração em inteligência operacional.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12">
                Começar Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-muted h-12 px-8">
                <Play className="mr-2 w-5 h-5" />
                Ver Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pain vs Solution */}
      <section className="py-20 bg-card/30 border-y border-border/50">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Pain */}
              <div className="p-8 rounded-2xl bg-destructive/5 border border-destructive/20">
                <h3 className="text-xl font-semibold text-destructive mb-4">❌ Sem SmartDrill</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                    Planilhas manuais sujeitas a erros
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                    Desvios de furos não detectados
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                    Sobrecarga de explosivos para compensar incertezas
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                    Zero visibilidade sobre custos reais
                  </li>
                </ul>
              </div>

              {/* Solution */}
              <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20">
                <h3 className="text-xl font-semibold text-primary mb-4">✓ Com SmartDrill</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    Analytics em tempo real automatizado
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    Comparação planejado vs executado instantânea
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    Otimização de carga baseada em dados reais
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    Dashboard completo de custos (Capex/Opex)
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Funcionalidades Principais
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para uma gestão de perfuração eficiente
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: BarChart3, title: "Planejamento Digital", desc: "Projetos de malha otimizados com visualização 3D" },
              { icon: Clock, title: "Gestão de Perfuratrizes", desc: "Monitore produtividade e disponibilidade em tempo real" },
              { icon: Shield, title: "Relatórios Automáticos", desc: "Documentação completa para compliance e SST" },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-card/30 border-y border-border/50">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Planos e Preços
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal para o tamanho da sua operação
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-6 rounded-2xl border ${
                  tier.highlighted
                    ? "bg-primary/5 border-primary shadow-lg shadow-primary/10"
                    : "bg-card border-border"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                      {tier.badge}
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{tier.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{tier.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl md:text-4xl font-bold text-foreground">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className={`w-5 h-5 shrink-0 ${tier.highlighted ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    tier.highlighted 
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  }`}
                  asChild={tier.name === "Enterprise"}
                >
                  {tier.name === "Enterprise" ? (
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      {tier.cta}
                    </a>
                  ) : (
                    tier.cta
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              O Que Nossos Clientes Dizem
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Resultados reais de operações que transformaram sua gestão
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{testimonial.name}</p>
                    <p className="text-muted-foreground text-xs">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-card/30 border-y border-border/50">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tire suas dúvidas sobre o SmartDrill
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-card border border-border rounded-xl px-6"
                >
                  <AccordionTrigger className="text-left text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pare de perder dinheiro na bancada
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Otimize sua operação hoje mesmo com dados reais e inteligência aplicada.
            </p>
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 h-14 text-lg"
              asChild
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 w-5 h-5" />
                Falar no WhatsApp
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
