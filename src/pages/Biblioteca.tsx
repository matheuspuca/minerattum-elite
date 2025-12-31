import { motion } from "framer-motion";
import { 
  BookOpen, 
  FileText, 
  Video, 
  Download,
  Star,
  ArrowRight,
  CheckCircle,
  Zap,
  GraduationCap,
  FileSpreadsheet
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

const infoproducts = [
  {
    category: "E-books Premium",
    icon: BookOpen,
    items: [
      {
        title: "Guia Completo de Perfuração de Rochas",
        description: "Manual técnico com 250+ páginas sobre técnicas avançadas de perfuração para desmonte.",
        price: "R$ 197,00",
        features: ["PDF + Atualizações", "Planilhas de cálculo", "Suporte por email"],
        badge: "Mais Vendido",
      },
      {
        title: "Gestão de Custos em Mineração",
        description: "Metodologias práticas para controle de Capex e Opex em operações de lavra.",
        price: "R$ 147,00",
        features: ["PDF Interativo", "Modelos de planilha", "Cases reais"],
      },
      {
        title: "Segurança em Desmonte de Rochas",
        description: "Normas, procedimentos e boas práticas de SST para operações com explosivos.",
        price: "R$ 127,00",
        features: ["PDF + Checklists", "Procedimentos prontos", "Templates"],
      },
    ],
  },
  {
    category: "Masterclasses",
    icon: Video,
    items: [
      {
        title: "Masterclass: KPIs para Perfuração",
        description: "Curso completo sobre indicadores de performance para operações de perfuração.",
        price: "R$ 497,00",
        features: ["12 horas de vídeo", "Material complementar", "Certificado"],
        badge: "Novo",
      },
      {
        title: "Análise de Fragmentação Avançada",
        description: "Técnicas de análise granulométrica e otimização de malhas de perfuração.",
        price: "R$ 397,00",
        features: ["8 horas de vídeo", "Casos práticos", "Suporte 30 dias"],
      },
    ],
  },
  {
    category: "Templates & Planilhas",
    icon: FileSpreadsheet,
    items: [
      {
        title: "Pack Completo de Planilhas de Perfuração",
        description: "Conjunto de 15+ planilhas profissionais para gestão de operações de perfuração.",
        price: "R$ 297,00",
        features: ["Excel editável", "Instruções de uso", "Atualizações grátis"],
      },
      {
        title: "Dashboard de Indicadores Excel",
        description: "Modelo de dashboard pronto para visualização de KPIs operacionais.",
        price: "R$ 197,00",
        features: ["Gráficos automáticos", "Fácil personalização", "Tutorial incluso"],
      },
    ],
  },
];

const benefits = [
  "Conteúdo desenvolvido por especialistas do setor",
  "Material prático e aplicável no dia a dia",
  "Atualizações incluídas sem custo adicional",
  "Suporte técnico especializado",
];

export default function Biblioteca() {
  const whatsappLink = "https://wa.me/5573999473043?text=Olá! Gostaria de saber mais sobre os materiais da Biblioteca Minerattum.";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="container px-4 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="flex flex-col items-center gap-4 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                <GraduationCap className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Infoprodutos de Alto Padrão</span>
              </div>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Biblioteca do <span className="text-accent">Setor Mineral</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              E-books, masterclasses e templates profissionais desenvolvidos por especialistas para engenheiros e gestores da mineração.
            </motion.p>

            {/* Benefits */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>{benefit}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      {infoproducts.map((category, catIndex) => (
        <section key={category.category} className={`py-16 ${catIndex % 2 === 0 ? 'bg-card/30 border-y border-border/50' : ''}`}>
          <div className="container px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-10"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <category.icon className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {category.category}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all hover:shadow-lg group"
                >
                  {item.badge && (
                    <div className="absolute -top-3 right-4">
                      <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                        {item.badge}
                      </span>
                    </div>
                  )}
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {item.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-2xl font-bold text-foreground">{item.price}</span>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Comprar
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-accent" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Precisa de Conteúdo Personalizado?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Desenvolvemos materiais técnicos sob demanda para empresas de mineração. 
              Entre em contato para discutir seu projeto.
            </p>
            
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 h-12"
              asChild
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Falar com Especialista
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
