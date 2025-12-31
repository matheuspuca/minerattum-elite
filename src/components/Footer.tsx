import { Linkedin, Instagram, Youtube, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import minerattumLogo from "@/assets/minerattum-logo.png";

const footerLinks = {
  produto: [
    { label: "SmartDrill Pro", href: "/smartdrill", isRoute: true },
    { label: "Funcionalidades", href: "/smartdrill#features", isRoute: false },
    { label: "Preços", href: "/smartdrill#pricing", isRoute: false },
  ],
  academy: [
    { label: "Cursos", href: "/#academy", isRoute: false },
    { label: "Manuais Técnicos", href: "/#academy", isRoute: false },
    { label: "Ferramentas", href: "/#academy", isRoute: false },
  ],
  empresa: [
    { label: "Sobre Nós", href: "/#sobre", isRoute: false },
    { label: "Contato", href: "/#contato", isRoute: false },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/minerattum", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-card/50">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img 
                src={minerattumLogo} 
                alt="Minerattum" 
                className="h-9 w-auto brightness-0 invert"
              />
              <span className="font-semibold text-lg text-foreground">Minerattum</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Tecnologia e educação para a mineração do futuro.
            </p>
            <div className="space-y-2">
              <a href="mailto:comercial@minerattum.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                <Mail className="w-4 h-4" />
                comercial@minerattum.com
              </a>
              <a href="tel:+5573999473043" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                <Phone className="w-4 h-4" />
                +55 73 99947-3043
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-foreground mb-4 capitalize text-sm">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.isRoute ? (
                      <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Minerattum Tecnologia e Mineração. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a 
                key={social.label} 
                href={social.href} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label} 
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/80 transition-all"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
