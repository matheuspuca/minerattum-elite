import { motion } from "framer-motion";
import { Target, Users, Award, TrendingUp } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Missão",
    description: "Fornecer soluções tecnológicas inovadoras que otimizam operações de perfuração e desmonte de rochas, reduzindo custos e aumentando a eficiência no setor mineral."
  },
  {
    icon: Users,
    title: "Visão",
    description: "Ser referência em tecnologia e educação para o setor mineral, transformando a forma como empresas gerenciam suas operações de perfuração."
  },
  {
    icon: Award,
    title: "Valores",
    description: "Inovação, excelência técnica, compromisso com resultados e parceria de longo prazo com nossos clientes."
  },
  {
    icon: TrendingUp,
    title: "Diferenciais",
    description: "Expertise técnica em perfuração de rochas, tecnologia proprietária e suporte especializado para tomada de decisões estratégicas."
  }
];

export const AboutSection = () => {
  return (
    <section id="sobre" className="py-20 md:py-28 bg-card/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Sobre Nós
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Minerattum Tecnologia e Mineração
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Somos uma empresa especializada em soluções tecnológicas para o setor mineral, 
            com foco em otimização de operações de perfuração e desmonte de rochas. 
            Nossa plataforma SmartDrill Pro nasceu da experiência prática no campo, 
            desenvolvida para resolver os desafios reais enfrentados por gestores de operações.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background/50 border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-primary/5 to-blue-500/5 border border-primary/20 rounded-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Operações Otimizadas</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">30%</div>
              <p className="text-muted-foreground">Redução Média de Custos</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Empresas Atendidas</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
