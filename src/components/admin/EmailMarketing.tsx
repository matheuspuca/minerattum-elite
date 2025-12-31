import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  message: string | null;
  source: string | null;
  created_at: string;
}

interface EmailMarketingProps {
  leads: Lead[];
}

const EmailMarketing = ({ leads }: EmailMarketingProps) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const toggleLead = (email: string) => {
    setSelectedLeads((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

  const selectAll = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads.map((l) => l.email));
    }
  };

  const handleSend = async () => {
    if (!subject.trim() || !message.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha o assunto e a mensagem.",
        variant: "destructive",
      });
      return;
    }

    if (selectedLeads.length === 0) {
      toast({
        title: "Selecione destinatários",
        description: "Selecione pelo menos um lead para enviar o email.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);

    try {
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0ea5e9; margin: 0;">Minerattum</h1>
          </div>
          <div style="background: #f8fafc; padding: 30px; border-radius: 12px;">
            ${message.split('\n').map(p => `<p style="color: #334155; line-height: 1.6; margin: 0 0 15px 0;">${p}</p>`).join('')}
          </div>
          <div style="text-align: center; margin-top: 30px; color: #64748b; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Minerattum. Todos os direitos reservados.</p>
          </div>
        </div>
      `;

      const { data, error } = await supabase.functions.invoke("send-marketing-email", {
        body: {
          recipients: selectedLeads,
          subject,
          htmlContent,
        },
      });

      if (error) throw error;

      if (data.success) {
        toast({
          title: "Emails enviados!",
          description: `${data.sent} emails enviados com sucesso${data.failed > 0 ? `, ${data.failed} falharam` : ''}.`,
        });
        setSubject("");
        setMessage("");
        setSelectedLeads([]);
      } else {
        throw new Error(data.error || "Erro ao enviar emails");
      }
    } catch (error: any) {
      console.error("Error sending emails:", error);
      toast({
        title: "Erro ao enviar",
        description: error.message || "Não foi possível enviar os emails. Configure a API key do Resend.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Email Composer */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Compor Email</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Assunto</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Assunto do email"
              className="w-full px-4 py-2 bg-background/50 border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Mensagem</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escreva sua mensagem..."
              rows={8}
              className="w-full px-4 py-2 bg-background/50 border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={sending}
            className="w-full bg-primary hover:bg-primary/90"
          >
            <Send className="w-4 h-4 mr-2" />
            {sending ? "Enviando..." : `Enviar para ${selectedLeads.length} contatos`}
          </Button>
        </div>
      </div>

      {/* Lead Selection */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Destinatários</h2>
          <Button variant="outline" size="sm" onClick={selectAll}>
            {selectedLeads.length === leads.length ? "Desmarcar Todos" : "Selecionar Todos"}
          </Button>
        </div>

        {leads.length === 0 ? (
          <div className="text-center py-12 bg-card/50 border border-border/50 rounded-xl">
            <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum lead disponível</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {leads.map((lead) => (
              <label
                key={lead.id}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedLeads.includes(lead.email)
                    ? "bg-primary/10 border-primary/50"
                    : "bg-card/50 border-border/50 hover:border-primary/30"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedLeads.includes(lead.email)}
                  onChange={() => toggleLead(lead.email)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{lead.name}</p>
                  <p className="text-xs text-muted-foreground">{lead.email}</p>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailMarketing;
