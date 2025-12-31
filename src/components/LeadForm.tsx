import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const LeadForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setIsSubmitted(true);
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card/50 border border-border/50 rounded-2xl p-8 text-center"
      >
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">Obrigado pelo contato!</h3>
        <p className="text-muted-foreground">Nossa equipe entrará em contato em breve.</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-card/50 border border-border/50 rounded-2xl p-6 md:p-8 space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Nome Completo *
          </label>
          <Input
            id="name"
            name="name"
            required
            placeholder="Seu nome"
            className="bg-background/50 border-border/50"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
            Empresa *
          </label>
          <Input
            id="company"
            name="company"
            required
            placeholder="Nome da empresa"
            className="bg-background/50 border-border/50"
          />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            E-mail *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="seu@email.com"
            className="bg-background/50 border-border/50"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            Telefone
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(00) 00000-0000"
            className="bg-background/50 border-border/50"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Mensagem *
        </label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Como podemos ajudar sua operação?"
          rows={4}
          className="bg-background/50 border-border/50"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        {isLoading ? (
          "Enviando..."
        ) : (
          <>
            Enviar Mensagem
            <Send className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </motion.form>
  );
};
