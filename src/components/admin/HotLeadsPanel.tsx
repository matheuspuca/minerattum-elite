import { motion } from "framer-motion";
import { Flame, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Lead } from "./types";

interface HotLeadsPanelProps {
  leads: Lead[];
}

export const HotLeadsPanel = ({ leads }: HotLeadsPanelProps) => {
  const hotLeads = leads
    .filter((lead) => lead.score >= 80)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const formatWhatsApp = (phone: string | null) => {
    if (!phone) return null;
    const cleaned = phone.replace(/\D/g, "");
    return `https://wa.me/${cleaned}`;
  };

  if (hotLeads.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-amber" />
          <h3 className="font-semibold text-foreground">Hot Leads</h3>
        </div>
        <p className="text-sm text-muted-foreground text-center py-8">
          Nenhum lead quente no momento
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-amber/20 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-5 h-5 text-amber" />
        <h3 className="font-semibold text-foreground">Action Center - Hot Leads</h3>
        <span className="ml-auto text-xs bg-amber/20 text-amber px-2 py-1 rounded-full">
          {hotLeads.length} leads
        </span>
      </div>

      <div className="space-y-3">
        {hotLeads.map((lead, index) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-amber/5 border border-amber/20 rounded-lg hover:bg-amber/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber/20 flex items-center justify-center">
                <span className="text-sm font-bold text-amber">{lead.score}</span>
              </div>
              <div>
                <p className="font-medium text-foreground">{lead.name}</p>
                <p className="text-xs text-muted-foreground">{lead.company || lead.email}</p>
              </div>
            </div>

            {lead.phone && (
              <Button
                asChild
                size="sm"
                className="bg-emerald hover:bg-emerald-dark text-white"
              >
                <a
                  href={formatWhatsApp(lead.phone) || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Chat
                </a>
              </Button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
