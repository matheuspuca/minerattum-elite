import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Shield, 
  BookOpen,
  Star,
  Cpu,
  Zap,
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

import ebookCover from "@/assets/ebook-ia-mineracao-new.png";

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

const PURCHASE_LINK = "https://pay.kiwify.com.br/ARc8267";

const features = [
  "Fundamentos de IA aplicada à mineração",
  "Automação de processos operacionais",
  "Internet das Coisas (IoT) no setor",
  "Machine Learning para otimização",
  "Cases de sucesso reais",
  "Tendências e futuro do setor",
];

const modules = [
  {
    title: "Introdução à IA na Mineração",
    description: "Conceitos fundamentais e panorama atual da tecnologia no setor"
  },
  {
    title: "Automação Inteligente",
    description: "Como implementar automação para aumentar eficiência operacional"
  },
  {
    title: "IoT e Sensores",
    description: "Monitoramento em tempo real e coleta de dados estratégicos"
  },
  {
    title: "Machine Learning Aplicado",
    description: "Algoritmos para previsão e otimização de processos"
  },
  {
    title: "Segurança e Manutenção Preditiva",
    description: "Como a IA está revolucionando a segurança nas minas"
  },
];

const testimonials = [
  {
    name: "Roberto Mendes",
    role: "Diretor de Operações",
    content: "Material essencial para entender como a IA está transformando o setor. Já implementamos algumas das práticas sugeridas em nossa operação.",
    rating: 5,
  },
  {
    name: "Ana Paula Costa",
    role: "Engenheira de Automação",
    content: "Conteúdo atual e bem fundamentado. Me ajudou a apresentar um projeto de modernização para a diretoria.",
    rating: 5,
  },
  {
    name: "Fernando Lima",
    role: "Consultor de Tecnologia",
    content: "Excelente material para quem quer entender as aplicações práticas de IA na mineração. Muito bem escrito e organizado.",
    rating: 5,
  },
];

const faqs = [
  {
    question: "Preciso ter conhecimento técnico em IA para aproveitar o e-book?",
    answer: "Não, o material foi desenvolvido para ser acessível tanto para iniciantes quanto para profissionais técnicos. Explicamos os conceitos de forma clara e progressiva."
  },
  {
    question: "O conteúdo é aplicável a qualquer tamanho de operação?",
    answer: "Sim, abordamos soluções que podem ser implementadas tanto em pequenas quanto em grandes mineradoras, com diferentes níveis de investimento."
  },
  {
    question: "Por quanto tempo terei acesso ao material?",
    answer: "O acesso é vitalício. Você pode baixar o e-book e consultá-lo sempre que precisar."
  },
  {
    question: "O e-book inclui exemplos práticos?",
    answer: "Sim, incluímos diversos cases de empresas que já implementaram IA em suas operações, com resultados concretos e aprendizados."
  },
  {
    question: "Existe garantia de satisfação?",
    answer: "Sim, oferecemos garantia de 7 dias. Se não ficar satisfeito, devolvemos 100% do seu investimento."
  },
];

export default function EbookIAMineracao() {
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
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5" />
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
                <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                  Preço Promocional
                </span>
                <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                  Novidade
                </span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                <span className="text-accent">IA</span> na Mineração
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-6">
                Descubra como a Inteligência Artificial está transformando a produtividade, segurança 
                e lucratividade das mineradoras — e aprenda a aplicar isso na sua operação.
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
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-accent font-medium">Por apenas</span>
                      <span className="text-4xl font-bold text-foreground">R$ 39,90</span>
                    </div>
                    <span className="text-sm text-muted-foreground">pagamento único</span>
                  </div>
                  <div className="ml-auto px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                    Oferta Especial
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
              className="flex justify-center group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full transition-all duration-300 group-hover:bg-accent/30 group-hover:blur-[60px]" />
                <img 
                  src={ebookCover} 
                  alt="E-book IA na Mineração"
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
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">100%</p>
                <p className="text-sm text-muted-foreground">Atualizado</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">+50%</p>
                <p className="text-sm text-muted-foreground">Produtividade</p>
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
              Conteúdo prático sobre as tecnologias que estão revolucionando o setor mineral
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
                className="bg-card rounded-xl p-6 border border-border hover:border-accent/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5 text-accent" />
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
              O Que Nossos Leitores Dizem
            </h2>
            <p className="text-lg text-muted-foreground">
              Profissionais que já estão aplicando IA em suas operações
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
                  <AccordionTrigger className="text-left text-foreground hover:text-accent">
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
      <section className="py-20 bg-gradient-to-b from-accent/5 to-background">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Prepare-se para o Futuro da Mineração
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              A transformação digital do setor já começou. Não fique para trás.
            </p>
            
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-accent font-medium">Por apenas</span>
                  <span className="text-5xl font-bold text-foreground">R$ 39,90</span>
                </div>
                <span className="text-sm text-muted-foreground">pagamento único</span>
              </div>
              
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-14 px-12 text-lg"
                asChild
              >
                <a href={PURCHASE_LINK} target="_blank" rel="noopener noreferrer">
                  Quero Aprender Sobre IA
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
