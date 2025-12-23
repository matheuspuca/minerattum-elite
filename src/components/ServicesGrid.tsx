import { motion } from "framer-motion";
import { ShieldCheck, Server, BookOpen, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: ShieldCheck,
    title: "Treinamentos SST & Normas Regulamentadoras",
    description: "Cursos obrigatórios e avançados para segurança operacional. Capacitação em NR-22, NR-19, NR-35 e demais normas aplicáveis à mineração.",
    size: "large",
    highlight: true,
  },
  {
    icon: Server,
    title: "Consultoria em Softwares",
    description: "Implantação e integração de sistemas para mineração. Suporte especializado para otimização de processos.",
    size: "normal",
  },
  {
    icon: BookOpen,
    title: "Infoprodutos",
    description: "Material técnico e guias operacionais. E-books, planilhas e templates para gestão de operações.",
    size: "normal",
  },
];

export const ServicesGrid = () => {
  return (
    <section id="solucoes" className="relative py-24 md:py-32">
      <div className="container px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Ecossistema de <span className="text-gradient-gold">Soluções</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Soluções integradas para modernizar e proteger suas operações de mineração.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative glass-card rounded-2xl p-8 hover:border-primary/40 transition-all duration-300 cursor-pointer ${
                service.size === "large" ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""
              } ${service.highlight ? "border-primary/30" : ""}`}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 h-full flex flex-col">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                  service.highlight 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-primary"
                }`}>
                  <service.icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="font-heading font-semibold text-xl md:text-2xl mb-3 text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  {service.description}
                </p>

                {/* Arrow */}
                <div className="mt-6 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium mr-2">Saiba mais</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
