import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  MessageSquare,
  ExternalLink,
  CheckCircle,
  Clock,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lead, LeadStatus } from "./types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface LeadDetailPanelProps {
  lead: Lead | null;
  onClose: () => void;
}

const statusConfig: Record<LeadStatus, { label: string; color: string }> = {
  new: { label: "Novo", color: "bg-primary text-primary-foreground" },
  contacted: { label: "Contactado", color: "bg-amber text-accent-foreground" },
  negotiation: { label: "Em Negociação", color: "bg-amber-light text-accent-foreground" },
  closed: { label: "Fechado", color: "bg-emerald text-white" },
  lost: { label: "Perdido", color: "bg-destructive text-destructive-foreground" },
};

// Mock journey data - in real app this would come from database
const mockJourney = [
  { date: "2024-01-15 09:30", action: "Downloaded eBook: Guia Diesel", icon: CheckCircle },
  { date: "2024-01-15 14:45", action: "Visited SmartDrill Page", icon: ExternalLink },
  { date: "2024-01-16 10:00", action: "Clicked Pricing Section", icon: ArrowRight },
  { date: "2024-01-16 11:30", action: "Submitted Contact Form", icon: Mail },
  { date: "2024-01-17 09:00", action: "Received Welcome Email", icon: Mail },
];

const emailSequence = [
  { name: "Welcome Email", status: "sent", date: "2024-01-17" },
  { name: "eBook Follow-up", status: "sent", date: "2024-01-19" },
  { name: "SmartDrill Demo Offer", status: "scheduled", date: "2024-01-22" },
  { name: "Case Study", status: "pending", date: "2024-01-25" },
];

export const LeadDetailPanel = ({ lead, onClose }: LeadDetailPanelProps) => {
  if (!lead) return null;

  const formatWhatsApp = (phone: string | null) => {
    if (!phone) return null;
    const cleaned = phone.replace(/\D/g, "");
    return `https://wa.me/${cleaned}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-screen w-full max-w-lg bg-card border-l border-border z-50 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">
                  {lead.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{lead.name}</h2>
                {lead.company && (
                  <p className="text-sm text-muted-foreground">{lead.company}</p>
                )}
              </div>
            </div>
            <Badge className={statusConfig[lead.status].color}>
              {statusConfig[lead.status].label}
            </Badge>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {/* Lead Score */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Lead Score</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${lead.score}%` }}
                  transition={{ duration: 0.8 }}
                  className={`h-full rounded-full ${
                    lead.score >= 80 
                      ? "bg-gradient-to-r from-amber to-amber-light" 
                      : lead.score >= 50 
                        ? "bg-gradient-to-r from-primary to-primary" 
                        : "bg-muted-foreground"
                  }`}
                />
              </div>
              <span className={`text-2xl font-bold ${
                lead.score >= 80 ? "text-amber" : "text-foreground"
              }`}>
                {lead.score}
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Informações de Contato</h3>
            <div className="space-y-3">
              <a 
                href={`mailto:${lead.email}`}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">{lead.email}</span>
              </a>
              {lead.phone && (
                <a 
                  href={formatWhatsApp(lead.phone) || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-emerald/10 rounded-lg hover:bg-emerald/20 transition-colors"
                >
                  <Phone className="w-5 h-5 text-emerald" />
                  <span className="text-sm text-foreground">{lead.phone}</span>
                  <span className="ml-auto text-xs text-emerald font-medium">WhatsApp →</span>
                </a>
              )}
              {lead.company && (
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Building className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-foreground">{lead.company}</span>
                </div>
              )}
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {format(new Date(lead.created_at), "PPP 'às' HH:mm", { locale: ptBR })}
                </span>
              </div>
            </div>
          </div>

          {/* Message */}
          {lead.message && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Mensagem</h3>
              <div className="p-4 bg-muted/50 rounded-lg">
                <MessageSquare className="w-5 h-5 text-muted-foreground mb-2" />
                <p className="text-sm text-foreground">{lead.message}</p>
              </div>
            </div>
          )}

          {/* Journey Timeline */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Lead Journey</h3>
            <div className="relative space-y-4">
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border" />
              {mockJourney.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-start gap-4 pl-8"
                >
                  <div className="absolute left-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <event.icon className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{event.action}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Email Sequence */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Email Workflow Status</h3>
            <div className="space-y-2">
              {emailSequence.map((email, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    email.status === "sent" 
                      ? "bg-emerald/5 border-emerald/20" 
                      : email.status === "scheduled"
                        ? "bg-amber/5 border-amber/20"
                        : "bg-muted/50 border-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {email.status === "sent" ? (
                      <CheckCircle className="w-4 h-4 text-emerald" />
                    ) : email.status === "scheduled" ? (
                      <Clock className="w-4 h-4 text-amber" />
                    ) : (
                      <Clock className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="text-sm text-foreground">{email.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{email.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
