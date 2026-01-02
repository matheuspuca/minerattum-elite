import { useState, useRef } from "react";
import { Mail, Send, Paperclip, X, FileImage, FileText } from "lucide-react";
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

interface AttachmentFile {
  file: File;
  preview: string;
  base64: string;
}

const EmailMarketing = ({ leads }: EmailMarketingProps) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [attachments, setAttachments] = useState<AttachmentFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    for (const file of Array.from(files)) {
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Tipo não permitido",
          description: `${file.name}: Apenas imagens (JPG, PNG, GIF, WebP) e PDFs são permitidos.`,
          variant: "destructive",
        });
        continue;
      }

      if (file.size > maxSize) {
        toast({
          title: "Arquivo muito grande",
          description: `${file.name}: O tamanho máximo é 5MB.`,
          variant: "destructive",
        });
        continue;
      }

      // Convert to base64
      const base64 = await fileToBase64(file);
      const preview = file.type.startsWith('image/') 
        ? URL.createObjectURL(file) 
        : '';

      setAttachments(prev => [...prev, { file, preview, base64 }]);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data:mime;base64, prefix
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => {
      const newAttachments = [...prev];
      if (newAttachments[index].preview) {
        URL.revokeObjectURL(newAttachments[index].preview);
      }
      newAttachments.splice(index, 1);
      return newAttachments;
    });
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

      const emailAttachments = attachments.map(att => ({
        filename: att.file.name,
        content: att.base64,
        contentType: att.file.type,
      }));

      const { data, error } = await supabase.functions.invoke("send-marketing-email", {
        body: {
          recipients: selectedLeads,
          subject,
          htmlContent,
          attachments: emailAttachments.length > 0 ? emailAttachments : undefined,
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
        setAttachments([]);
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
              rows={6}
              className="w-full px-4 py-2 bg-background/50 border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

          {/* Attachments Section */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Anexos</label>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              accept="image/jpeg,image/png,image/gif,image/webp,application/pdf"
              multiple
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-dashed"
            >
              <Paperclip className="w-4 h-4 mr-2" />
              Adicionar Anexo (Imagem ou PDF)
            </Button>

            {/* Attachment Previews */}
            {attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {attachments.map((att, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg border border-border/50"
                  >
                    {att.file.type.startsWith('image/') ? (
                      <img
                        src={att.preview}
                        alt={att.file.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {att.file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(att.file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(index)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
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
