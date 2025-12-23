import { motion } from "framer-motion";
import { Linkedin, Instagram, Youtube, Mail, Zap } from "lucide-react";

const footerLinks = {
  produto: [
    { label: "SmartDrill Pro", href: "#smartdrill" },
    { label: "Funcionalidades", href: "#" },
    { label: "Preços", href: "#" },
  ],
  academy: [
    { label: "Cursos", href: "#academy" },
    { label: "Manuais Técnicos", href: "#" },
    { label: "Ferramentas", href: "#" },
  ],
  empresa: [
    { label: "Sobre Nós", href: "#sobre" },
    { label: "Contato", href: "#contato" },
    { label: "Blog", href: "#" },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-card/50">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg text-foreground">Minerattum</span>
            </a>
            <p className="text-muted-foreground text-sm mb-4">
              Tecnologia e educação para a mineração do futuro.
            </p>
            <a href="mailto:contato@minerattum.com.br" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
              <Mail className="w-4 h-4" />
              contato@minerattum.com.br
            </a>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-foreground mb-4 capitalize text-sm">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Minerattum. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} aria-label={social.label} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/80 transition-all">
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
