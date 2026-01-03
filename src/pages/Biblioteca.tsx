import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  CheckCircle,
  Zap,
  GraduationCap,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Book3D } from "@/components/Book3D";

// Import ebook covers
import ebookMineracaoLegalizada from "@/assets/ebook-mineracao-legalizada-new.png";
import ebookIAMineracao from "@/assets/ebook-ia-mineracao-new.png";
import ebookConsultoriaAvancada from "@/assets/ebook-consultoria-avancada-new.png";

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

const ebooks = [
  {
    id: 1,
    title: "Como iniciar uma pequena mineração legalizada",
    description: "Aprenda o passo a passo completo para iniciar sua operação de mineração dentro da legalidade.",
    image: ebookMineracaoLegalizada,
    features: ["Licenciamento ambiental", "Aspectos legais e regulamentações", "Viabilidade econômica"],
    originalPrice: "R$ 499,00",
    price: "R$ 129,99",
    installments: "em até 12x*",
    badge: "Mais Vendido",
    pageLink: "/ebook/mineracao-legalizada",
  },
  {
    id: 2,
    title: "IA na Mineração",
    description: "Aprenda como a IA está transformando produtividade, segurança e lucratividade das mineradoras e descubra como aplicar isso na sua operação.",
    image: ebookIAMineracao,
    features: ["IA na Mineração", "Automação e IoT"],
    price: "R$ 39,90",
    badge: "Preço Promocional",
    badgeColor: "bg-accent",
    pageLink: "/ebook/ia-mineracao",
  },
  {
    id: 3,
    title: "Consultoria em Mineração Avançada",
    description: "Torne-se um consultor especializado em projetos de mineração com metodologias avançadas.",
    image: ebookConsultoriaAvancada,
    features: ["Avaliação de projetos", "Due diligence mineral", "Modelagem financeira"],
    originalPrice: "R$ 897,00",
    price: "R$ 99,99",
    installments: "em até 12x*",
    pageLink: "/ebook/consultoria-avancada",
  },
];

const benefits = [
  "Conteúdo desenvolvido por especialistas do setor",
  "Material prático e aplicável no dia a dia",
  "Acesso imediato após a compra",
  "Suporte técnico especializado",
];

export default function Biblioteca() {
  const whatsappBase = "https://wa.me/5573999473043?text=";

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
                <span className="text-sm font-medium text-accent">E-books Exclusivos</span>
              </div>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Biblioteca do <span className="text-accent">Setor Mineral</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              E-books profissionais desenvolvidos por especialistas para quem quer dominar o setor de mineração.
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

      {/* E-books Section */}
      <section className="py-16 bg-card/30 border-y border-border/50">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              E-books Premium
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ebooks.map((ebook, i) => (
              <motion.div
                key={ebook.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl bg-card border border-border hover:border-primary/30 transition-all hover:shadow-xl group overflow-hidden"
              >
                {/* Badge */}
                {ebook.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-3 py-1 rounded-full ${ebook.badgeColor || 'bg-primary'} text-primary-foreground text-xs font-semibold shadow-lg`}>
                      {ebook.badge}
                    </span>
                  </div>
                )}
                
                {/* 3D Book Cover */}
                <div className="relative h-72 overflow-hidden bg-gradient-to-b from-muted/50 to-muted flex items-center justify-center py-8">
                  <Book3D coverImage={ebook.image} title={ebook.title} />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {ebook.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {ebook.description}
                  </p>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <p className="text-sm font-medium text-foreground mb-2">O que você vai aprender:</p>
                    <ul className="space-y-2">
                      {ebook.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Pricing */}
                  <div className="pt-4 border-t border-border/50">
                    <div className="flex flex-col gap-1 mb-4">
                      {ebook.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          De {ebook.originalPrice}
                        </span>
                      )}
                      <div className="flex items-baseline gap-2">
                        {ebook.originalPrice && (
                          <span className="text-sm text-accent font-medium">Por</span>
                        )}
                        <span className="text-3xl font-bold text-foreground">{ebook.price}</span>
                      </div>
                      {ebook.installments && (
                        <span className="text-sm text-muted-foreground">{ebook.installments}</span>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                      asChild
                    >
                      <Link to={ebook.pageLink}>
                        Ver mais
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              <a 
                href={`${whatsappBase}${encodeURIComponent("Olá! Gostaria de saber mais sobre conteúdos personalizados para minha empresa.")}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
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
