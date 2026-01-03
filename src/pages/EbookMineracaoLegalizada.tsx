import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Shield, 
  BookOpen,
  Star,
  ChevronDown,
  Award,
  Users,
  Clock
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

import ebookCover from "@/assets/ebook-mineracao-legalizada-new.png";

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

const PURCHASE_LINK = "https://pay.kiwify.com.br/6kQskbv";

const features = [
  "Passo a passo completo para legalização",
  "Licenciamento ambiental detalhado",
  "Aspectos legais e regulamentações",
  "Viabilidade econômica do projeto",
  "Modelos de documentos prontos",
  "Estudos de caso reais",
];

const modules = [
  {
    title: "Introdução ao Setor Mineral",
    description: "Panorama do mercado e oportunidades para pequenas minerações"
  },
  {
    title: "Aspectos Legais e Regulatórios",
    description: "Toda legislação que você precisa conhecer para operar legalmente"
  },
  {
    title: "Licenciamento Ambiental",
    description: "Processo completo de licenciamento e documentação necessária"
  },
  {
    title: "Viabilidade Técnica e Econômica",
    description: "Como avaliar se seu projeto é financeiramente viável"
  },
  {
    title: "Operação e Gestão",
    description: "Boas práticas para uma operação eficiente e sustentável"
  },
];

const testimonials = [
  {
    name: "Carlos Silva",
    role: "Empresário do setor mineral",
    content: "Consegui legalizar minha operação em tempo recorde seguindo o passo a passo do e-book. Material extremamente prático e objetivo.",
    rating: 5,
  },
  {
    name: "Maria Santos",
    role: "Engenheira de Minas",
    content: "Conteúdo muito bem estruturado. Me ajudou a entender todos os processos de licenciamento que antes pareciam complexos demais.",
    rating: 5,
  },
  {
    name: "João Oliveira",
    role: "Consultor Ambiental",
    content: "Recomendo para todos os meus clientes. O material é atualizado e cobre todos os aspectos importantes da legalização.",
    rating: 5,
  },
];

const faqs = [
  {
    question: "O e-book serve para qualquer tipo de mineração?",
    answer: "Sim, o conteúdo abrange os processos de legalização para diversos tipos de mineração de pequeno porte, incluindo areia, brita, argila e outros minerais de uso na construção civil."
  },
  {
    question: "Por quanto tempo terei acesso ao material?",
    answer: "O acesso é vitalício. Após a compra, você pode baixar o e-book e acessá-lo quando quiser, além de receber atualizações futuras sem custo adicional."
  },
  {
    question: "O conteúdo está atualizado com a legislação atual?",
    answer: "Sim, mantemos o material sempre atualizado com as últimas alterações na legislação mineral e ambiental brasileira."
  },
  {
    question: "Posso tirar dúvidas após a compra?",
    answer: "Sim, oferecemos suporte por e-mail para esclarecer dúvidas sobre o conteúdo do material."
  },
  {
    question: "Existe garantia de satisfação?",
    answer: "Sim, oferecemos garantia de 7 dias. Se não ficar satisfeito, devolvemos 100% do seu investimento."
  },
];

export default function EbookMineracaoLegalizada() {
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
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
                <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                  Mais Vendido
                </span>
                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium">
                  E-book Premium
                </span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Como Iniciar uma Pequena Mineração <span className="text-primary">Legalizada</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-6">
                O guia definitivo para quem deseja iniciar uma operação de mineração de pequeno porte 
                de forma 100% legal e lucrativa. Aprenda todo o processo de legalização do zero.
              </motion.p>
              
              {/* Features list */}
              <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-3 mb-8">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </motion.div>
              
              {/* Pricing */}
              <motion.div variants={fadeInUp} className="bg-card rounded-2xl p-6 border border-border mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <span className="text-sm text-muted-foreground line-through">De R$ 499,00</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-accent font-medium">Por</span>
                      <span className="text-4xl font-bold text-foreground">R$ 129,99</span>
                    </div>
                    <span className="text-sm text-muted-foreground">em até 12x*</span>
                  </div>
                  <div className="ml-auto px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                    74% OFF
                  </div>
                </div>
                
                <Button 
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-14 text-lg"
                  asChild
                >
                  <a href={PURCHASE_LINK} target="_blank" rel="noopener noreferrer">
                    Comprar Agora
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
                
                <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-accent" />
                    <span>Compra segura</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-accent" />
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
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                <img 
                  src={ebookCover} 
                  alt="E-book Mineração Legalizada"
                  className="max-w-full max-h-80 object-contain drop-shadow-2xl relative z-10"
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
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">500+</p>
                <p className="text-sm text-muted-foreground">Alunos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">4.9/5</p>
                <p className="text-sm text-muted-foreground">Avaliação</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-emerald-500" />
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
              Conteúdo completo e estruturado para você dominar todo o processo de legalização
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
                className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="w-5 h-5 text-primary" />
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
              Depoimentos reais de quem já transformou sua carreira
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
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
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
                  <AccordionTrigger className="text-left text-foreground hover:text-primary">
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
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comece Sua Jornada Hoje
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Aproveite a oferta especial e dê o primeiro passo para legalizar sua mineração
            </p>
            
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="flex flex-col items-center gap-4 mb-6">
                <span className="text-sm text-muted-foreground line-through">De R$ 499,00</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-accent font-medium">Por apenas</span>
                  <span className="text-5xl font-bold text-foreground">R$ 129,99</span>
                </div>
                <span className="text-sm text-muted-foreground">em até 12x*</span>
              </div>
              
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-14 px-12 text-lg"
                asChild
              >
                <a href={PURCHASE_LINK} target="_blank" rel="noopener noreferrer">
                  Quero Garantir Minha Cópia
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
