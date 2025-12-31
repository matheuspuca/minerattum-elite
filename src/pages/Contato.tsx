import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeadForm } from "@/components/LeadForm";

const contactInfo = [
  {
    icon: Mail,
    label: "E-mail",
    value: "comercial@minerattum.com",
    href: "mailto:comercial@minerattum.com"
  },
  {
    icon: Phone,
    label: "Telefone",
    value: "+55 73 99947-3043",
    href: "tel:+5573999473043"
  },
  {
    icon: MapPin,
    label: "Localização",
    value: "Brasil",
    href: null
  }
];

const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    value: "@minerattum",
    href: "https://instagram.com/minerattum"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Minerattum",
    href: "https://linkedin.com/company/minerattum"
  }
];

const Contato = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Contato
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Fale Conosco
            </h1>
            <p className="text-muted-foreground text-lg">
              Entre em contato para saber como o SmartDrill Pro pode otimizar sua operação de perfuração.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-20">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Envie sua mensagem</h2>
              <LeadForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Informações de Contato</h2>
                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 p-4 bg-card/50 border border-border/50 rounded-xl"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-foreground font-medium hover:text-primary transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-foreground font-medium">{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Redes Sociais</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-card/50 border border-border/50 rounded-xl hover:border-primary/30 transition-all flex-1"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <social.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{social.label}</p>
                        <p className="text-foreground font-medium">{social.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/20 rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">Quer testar o SmartDrill Pro?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Acesse nossa plataforma e veja como podemos otimizar sua operação.
                </p>
                <a
                  href="https://smartdrillpro.vercel.app/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  Acessar Plataforma →
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contato;
