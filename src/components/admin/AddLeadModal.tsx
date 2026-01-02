import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus, X, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LeadStatus, LeadSource } from "./types";

const leadFormSchema = z.object({
  name: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  source: z.string().min(1, "Selecione uma origem"),
  status: z.string().min(1, "Selecione um status"),
  score: z.number().min(0).max(100),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

interface AddLeadModalProps {
  onLeadAdded: () => void;
}

const sourceOptions: { value: LeadSource; label: string }[] = [
  { value: "website", label: "Website" },
  { value: "contact_form", label: "Formulário de Contato" },
  { value: "diesel_ebook", label: "Diesel eBook" },
  { value: "smartdrill_trial", label: "SmartDrill Trial" },
  { value: "newsletter", label: "Newsletter" },
  { value: "demo_request", label: "Solicitação de Demo" },
];

const statusOptions: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "Novo" },
  { value: "contacted", label: "Contactado" },
  { value: "negotiation", label: "Negociação" },
  { value: "closed", label: "Fechado" },
  { value: "lost", label: "Perdido" },
];

export const AddLeadModal = ({ onLeadAdded }: AddLeadModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      source: "website",
      status: "new",
      score: 50,
      message: "",
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    setLoading(true);
    try {
      const { error } = await supabase.from("leads").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        source: data.source,
        status: data.status,
        score: data.score,
        message: data.message || null,
        last_activity: new Date().toISOString(),
      });

      if (error) throw error;

      toast({
        title: "Lead adicionado",
        description: `${data.name} foi adicionado com sucesso.`,
      });

      form.reset();
      setOpen(false);
      onLeadAdded();
    } catch (error) {
      console.error("Error adding lead:", error);
      toast({
        title: "Erro ao adicionar lead",
        description: "Não foi possível adicionar o lead. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <UserPlus className="w-4 h-4" />
          Adicionar Lead
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary" />
            Adicionar Novo Lead
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome *</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="+55 11 99999-9999" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da empresa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origem *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sourceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="score"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Score (0-100)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={0} 
                        max={100} 
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem / Observações</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Informações adicionais sobre o lead..."
                      className="resize-none"
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Adicionar Lead"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
