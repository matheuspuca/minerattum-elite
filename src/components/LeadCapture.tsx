import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

export const LeadCapture = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Sucesso!",
      description: "Em breve entraremos em contato.",
    });
    
    setEmail("");
    setIsLoading(false);
  };

  return (
    <section id="contato" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Transforme sua operação
            </span>
          </div>

          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Modernize sua <span className="text-gradient-gold">operação</span> hoje
          </h2>
          
          <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
            Receba uma consultoria gratuita sobre como nossas soluções podem 
            impactar sua operação de mineração.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-14 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground rounded-xl focus:border-primary focus:ring-primary"
              required
            />
            <Button 
              type="submit" 
              size="lg"
              disabled={isLoading}
              className="h-14 bg-primary text-primary-foreground hover:bg-primary/90 px-8 rounded-xl group whitespace-nowrap"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  Solicitar Contato
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            Sem spam. Respeitamos sua privacidade.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
