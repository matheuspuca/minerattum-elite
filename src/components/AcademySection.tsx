import { motion } from "framer-motion";
import { ArrowRight, BookOpen, FileText, Calculator, GraduationCap, Download, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    type: "Infoproduct",
    title: "Manuais Técnicos",
    description: "Guias completos de operação, desmonte e segurança para mineração.",
    icon: FileText,
    tag: "Download Imediato",
    tagColor: "bg-primary/10 text-primary",
    gradient: "from-primary/20 to-primary/5",
    borderColor: "hover:border-primary/40",
  },
  {
    id: 2,
    type: "Training",
    title: "Cursos Especializados",
    description: "Formação técnica em Operação, Desmonte e SST ministrada por especialistas.",
    icon: GraduationCap,
    tag: "Certificado Incluso",
    tagColor: "bg-accent/10 text-accent",
    gradient: "from-accent/20 to-accent/5",
    borderColor: "hover:border-accent/40",
  },
  {
    id: 3,
    type: "Tools",
    title: "Ferramentas Práticas",
    description: "Planilhas, calculadoras e templates para gestão de bancada e explosivos.",
    icon: Calculator,
    tag: "Acesso Imediato",
    tagColor: "bg-emerald-500/10 text-emerald-400",
    gradient: "from-emerald-500/20 to-emerald-500/5",
    borderColor: "hover:border-emerald-500/40",
  },
];

export const AcademySection = () => {
  return (
    <section id="academy" className="relative py-24 md:py-32 overflow-hidden bg-muted/20">
      {/* Background */}
      <div className="absolute inset-0 topography-bg opacity-30" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[200px]" />

      <div className="container relative z-10 px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <BookOpen className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent">Conhecimento Premium</span>
          </div>

          <h2 className="font-semibold text-3xl md:text-4xl lg:text-5xl mb-4 text-foreground leading-tight tracking-tight">
            Minerattum <span className="text-gradient-gold">Academy</span> & Library
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conteúdo técnico especializado desenvolvido por engenheiros com experiência real em operações de mineração.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="group h-full"
            >
              <div className={`relative h-full glass-card rounded-2xl p-6 cursor-pointer overflow-hidden border border-border/50 ${product.borderColor} transition-all duration-300 hover:shadow-xl`}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Tag */}
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${product.tagColor} mb-4`}>
                    <Download className="w-3 h-3" />
                    {product.tag}
                  </span>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-card border border-border/50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <product.icon className="w-7 h-7 text-foreground" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-semibold text-xl mb-2 text-foreground group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center text-primary text-sm font-medium">
                    <span>Explorar</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Button 
            size="lg" 
            variant="outline"
            className="border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground px-8 rounded-xl"
          >
            Ver Todo o Catálogo
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
