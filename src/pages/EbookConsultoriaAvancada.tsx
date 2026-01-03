import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Shield, 
  BookOpen,
  Star,
  Briefcase,
  Target,
  Award,
  Users,
  Clock,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import ebookCover from "@/assets/ebook-consultoria-avancada-new.png";

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

const PURCHASE_LINK = "https://pay.kiwify.com.br/MAiSfbr";

const features = [
  "Metodologias avançadas de consultoria",
  "Avaliação técnica de projetos",
  "Due diligence mineral completa",
  "Modelagem financeira de minas",
  "Gestão de riscos em projetos",
  "Ferramentas e templates exclusivos",
];

const modules = [
  {
    title: "Fundamentos da Consultoria Mineral",
    description: "Base teórica e prática para atuar como consultor especializado"
  },
  {
    title: "Avaliação de Projetos Minerais",
    description: "Metodologias para avaliar viabilidade técnica e econômica"
  },
  {
    title: "Due Diligence Mineral",
    description: "Processo completo de auditoria técnica de ativos minerais"
  },
  {
    title: "Modelagem Financeira",
    description: "Construção de modelos financeiros para projetos de mineração"
  },
  {
    title: "Gestão de Riscos",
    description: "Identificação, análise e mitigação de riscos em projetos"
  },
  {
    title: "Prática Profissional",
    description: "Como estruturar e precificar seus serviços de consultoria"
  },
];

const testimonials = [
  {
    name: "Ricardo Almeida",
    role: "Consultor Independente",
    content: "Este material foi fundamental para estruturar minha carreira como consultor. As metodologias são muito bem explicadas e aplicáveis.",
    rating: 5,
  },
  {
    name: "Patrícia Fernandes",
    role: "Geóloga Senior",
    content: "Conteúdo de altíssimo nível. Me ajudou a entender a fundo os processos de due diligence que antes eu conhecia superficialmente.",
    rating: 5,
  },
  {
    name: "Eduardo Santos",
    role: "Diretor de Projetos",
    content: "Material indispensável para quem trabalha com avaliação de projetos minerais. Muito completo e atualizado.",
    rating: 5,
  },
];

const faqs = [
  {
    question: "O e-book é indicado para quem já atua como consultor?",
    answer: "Sim, o material é voltado tanto para profissionais que desejam iniciar na área de consultoria quanto para quem já atua e quer aprofundar seus conhecimentos com metodologias avançadas."
  },
  {
    question: "Quais pré-requisitos são necessários?",
    answer: "Recomendamos conhecimento básico em geologia ou engenharia de minas. No entanto, o material é didático e acessível para profissionais de áreas correlatas."
  },
  {
    question: "O material inclui templates e ferramentas?",
    answer: "Sim, incluímos modelos de relatórios, planilhas de modelagem financeira e checklists para due diligence que você pode adaptar para seus projetos."
  },
  {
    question: "Por quanto tempo terei acesso ao material?",
    answer: "O acesso é vitalício. Após a compra, você pode baixar todos os materiais e acessá-los quando quiser."
  },
  {
    question: "Existe garantia de satisfação?",
    answer: "Sim, oferecemos garantia de 7 dias. Se não ficar satisfeito com o conteúdo, devolvemos 100% do seu investimento."
  },
];

export default function EbookConsultoriaAvancada() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Back Button */}
      <div className="container px-4 pt-24 md:pt-28">
        <Link 
          to="/biblioteca" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Biblioteca</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-background to-primary/5" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="container px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold">
                  Avançado
                </span>
                <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                  E-book Premium
                </span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Consultoria em Mineração <span className="text-emerald-500">Avançada</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-6">
                Torne-se um consultor especializado em projetos de mineração. Domine metodologias 
                avançadas de avaliação, due diligence e modelagem financeira de ativos minerais.
              </motion.p>
              
              {/* Features list */}
              <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-3 mb-8">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </motion.div>
              
              {/* Pricing */}
              <motion.div variants={fadeInUp} className="bg-card rounded-2xl p-6 border border-border mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <span className="text-sm text-muted-foreground line-through">De R$ 897,00</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-emerald-500 font-medium">Por</span>
                      <span className="text-4xl font-bold text-foreground">R$ 99,99</span>
                    </div>
                    <span className="text-sm text-muted-foreground">em até 12x*</span>
                  </div>
                  <div className="ml-auto px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium">
                    89% OFF
                  </div>
                </div>
                
                <Button 
                  size="lg"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold h-14 text-lg"
                  asChild
                >
                  <a href={PURCHASE_LINK} target="_blank" rel="noopener noreferrer">
                    Comprar Agora
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
                
                <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-emerald-500" />
                    <span>Compra segura</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    <span>Acesso imediato</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Ebook Cover */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full transition-all duration-300 group-hover:bg-emerald-500/30 group-hover:blur-[60px]" />
                <img 
                  src={ebookCover} 
                  alt="E-book Consultoria Avançada"
                  className="max-w-full max-h-80 object-contain drop-shadow-2xl relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-8 bg-card/50 border-y border-border/50">
        <div className="container px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">Nível</p>
                <p className="text-sm text-muted-foreground">Profissional</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">6</p>
                <p className="text-sm text-muted-foreground">Módulos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">7 dias</p>
                <p className="text-sm text-muted-foreground">Garantia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-20">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              O Que Você Vai Aprender
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conteúdo completo para você se tornar um consultor de referência no setor mineral
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {modules.map((module, i) => (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 border border-border hover:border-emerald-500/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                  <BookOpen className="w-5 h-5 text-emerald-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{module.title}</h3>
                <p className="text-sm text-muted-foreground">{module.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-card/30 border-y border-border/50">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              O Que Nossos Alunos Dizem
            </h2>
            <p className="text-lg text-muted-foreground">
              Profissionais que elevaram suas carreiras com nosso material
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
                className="bg-card rounded-xl p-6 border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
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
            <p className="text-lg text-muted-foreground">
              Tire suas dúvidas sobre o e-book
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-foreground hover:text-emerald-500">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-emerald-500/5 to-background">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Eleve Sua Carreira Agora
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Aproveite a oferta especial e torne-se um consultor de alto nível no setor mineral
            </p>
            
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="flex flex-col items-center gap-4 mb-6">
                <span className="text-sm text-muted-foreground line-through">De R$ 897,00</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-emerald-500 font-medium">Por apenas</span>
                  <span className="text-5xl font-bold text-foreground">R$ 99,99</span>
                </div>
                <span className="text-sm text-muted-foreground">em até 12x*</span>
              </div>
              
              <Button 
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold h-14 px-12 text-lg"
                asChild
              >
                <a href={PURCHASE_LINK} target="_blank" rel="noopener noreferrer">
                  Quero Me Tornar Consultor
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              
              <p className="text-sm text-muted-foreground mt-4">
                <Shield className="w-4 h-4 inline mr-1" />
                Garantia de 7 dias ou seu dinheiro de volta
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
