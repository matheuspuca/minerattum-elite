import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import minerattumIcon from "@/assets/minerattum-icon.png";

const navLinks = [
  { label: "SmartDrill", href: "/smartdrill", highlight: true },
  { label: "Biblioteca", href: "/biblioteca" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isSmartDrillPage = location.pathname === "/smartdrill";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50"
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={minerattumIcon} 
              alt="Minerattum" 
              className="h-8 md:h-9 w-auto"
            />
            <span className="font-sans font-semibold text-lg text-foreground">Minerattum</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = link.href === "/smartdrill" && isSmartDrillPage;
              const isRouterLink = link.href.startsWith("/") && !link.href.includes("#");
              
              if (isRouterLink) {
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive || link.highlight
                        ? "text-primary font-semibold"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              }
              
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    link.highlight
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a href="https://smartdrillpro.vercel.app/signup" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" className="text-foreground border border-border/50 hover:bg-muted hover:border-primary/30">
                Acessar Plataforma
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 border-t border-border/20"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isRouterLink = link.href.startsWith("/") && !link.href.includes("#");
                
                if (isRouterLink) {
                  return (
                    <Link
                      key={link.label}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-base font-medium transition-colors hover:text-primary ${
                        link.highlight
                          ? "text-primary font-semibold"
                          : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                }
                
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-medium transition-colors hover:text-primary ${
                      link.highlight
                        ? "text-primary font-semibold"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <a href="https://smartdrillpro.vercel.app/signup" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="ghost" className="mt-2 w-full text-foreground border border-border/50 hover:bg-muted">
                  Acessar Plataforma
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};
