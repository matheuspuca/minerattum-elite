import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Bomb, 
  Truck, 
  HardHat, 
  Flame, 
  Mountain,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const courses = [
  {
    id: 1,
    code: "NR-22",
    title: "Segurança e Saúde na Mineração",
    description: "Capacitação completa sobre as normas de segurança específicas para operações de mineração subterrânea e a céu aberto.",
    icon: Mountain,
    duration: "40h",
    students: "2.400+",
    color: "from-accent to-orange-600",
    featured: true,
  },
  {
    id: 2,
    code: "NR-19",
    title: "Explosivos e Detonações",
    description: "Manuseio, armazenamento e transporte de explosivos. Procedimentos seguros para desmonte de rocha.",
    icon: Bomb,
    duration: "24h",
    students: "1.850+",
    color: "from-red-500 to-rose-600",
  },
  {
    id: 3,
    code: "NR-11",
    title: "Transporte e Movimentação de Cargas",
    description: "Operação segura de equipamentos de transporte, içamento e movimentação de materiais.",
    icon: Truck,
    duration: "16h",
    students: "3.100+",
    color: "from-primary to-blue-600",
  },
  {
    id: 4,
    code: "NR-35",
    title: "Trabalho em Altura",
    description: "Requisitos mínimos de proteção para trabalhos em altura envolvendo risco de queda.",
    icon: HardHat,
    duration: "8h",
    students: "4.200+",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 5,
    code: "Blasting Safety",
    title: "Segurança em Desmonte",
    description: "Curso avançado sobre técnicas de desmonte com explosivos e protocolos de evacuação.",
    icon: Flame,
    duration: "32h",
    students: "980+",
    color: "from-accent to-orange-600",
  },
  {
    id: 6,
    code: "SST Avançado",
    title: "Gestão de Riscos Operacionais",
    description: "Identificação, avaliação e controle de riscos em operações de mineração complexas.",
    icon: ShieldCheck,
    duration: "20h",
    students: "1.450+",
    color: "from-violet-500 to-purple-600",
  },
];

export const TrainingCarousel = () => {
  return (
    <section id="treinamentos" className="relative py-24 md:py-32 overflow-hidden">
      <div className="container px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Capacitação Certificada</span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-foreground">
            Treinamentos <span className="text-gradient-gold">SST</span> & Normas
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cursos obrigatórios e avançados ministrados por especialistas com experiência real em mineração.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {courses.map((course, index) => (
                <CarouselItem key={course.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="h-full"
                  >
                    <div className={`group relative h-full glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ${course.featured ? 'ring-2 ring-primary/30' : ''}`}>
                      {/* Featured Badge */}
                      {course.featured && (
                        <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wide">
                          Popular
                        </div>
                      )}

                      {/* Gradient Icon */}
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                        <course.icon className="w-7 h-7 text-white" />
                      </div>

                      {/* Course Code */}
                      <span className="inline-block px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs font-mono font-semibold mb-3">
                        {course.code}
                      </span>

                      {/* Title & Description */}
                      <h3 className="font-heading font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3">
                        {course.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {course.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            {course.students}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <CarouselPrevious className="relative inset-auto translate-y-0 w-12 h-12 rounded-full border-border bg-card hover:bg-muted">
                <ChevronLeft className="w-5 h-5" />
              </CarouselPrevious>
              <CarouselNext className="relative inset-auto translate-y-0 w-12 h-12 rounded-full border-border bg-card hover:bg-muted">
                <ChevronRight className="w-5 h-5" />
              </CarouselNext>
            </div>
          </Carousel>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button 
            size="lg" 
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground px-8 rounded-xl"
          >
            Ver Todos os Cursos
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
