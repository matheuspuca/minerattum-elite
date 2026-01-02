import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  MessageCircle, 
  ChevronDown,
  ArrowUpDown,
  RefreshCw,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Lead, LeadStatus } from "./types";
import { LeadDetailPanel } from "./LeadDetailPanel";
import { AddLeadModal } from "./AddLeadModal";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface LeadsCRMProps {
  leads: Lead[];
  loading: boolean;
  onRefresh: () => void;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: LeadStatus) => void;
  onUpdateScore: (id: string, score: number) => void;
}

const statusConfig: Record<LeadStatus, { label: string; color: string }> = {
  new: { label: "Novo", color: "bg-primary/20 text-primary border-primary/30" },
  contacted: { label: "Contactado", color: "bg-amber/20 text-amber border-amber/30" },
  negotiation: { label: "Negociação", color: "bg-amber-light/20 text-amber-light border-amber-light/30" },
  closed: { label: "Fechado", color: "bg-emerald/20 text-emerald border-emerald/30" },
  lost: { label: "Perdido", color: "bg-destructive/20 text-destructive border-destructive/30" },
};

const sourceLabels: Record<string, { label: string; color: string }> = {
  diesel_ebook: { label: "Diesel eBook", color: "bg-amber/10 text-amber" },
  smartdrill_trial: { label: "SmartDrill Trial", color: "bg-emerald/10 text-emerald" },
  newsletter: { label: "Newsletter", color: "bg-primary/10 text-primary" },
  website: { label: "Website", color: "bg-muted text-muted-foreground" },
  contact_form: { label: "Formulário", color: "bg-primary/10 text-primary" },
  demo_request: { label: "Demo Request", color: "bg-emerald/10 text-emerald" },
};

export const LeadsCRM = ({ leads, loading, onRefresh, onDelete, onUpdateStatus, onUpdateScore }: LeadsCRMProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [sourceFilter, setSourceFilter] = useState<string | "all">("all");
  const [scoreFilter, setScoreFilter] = useState<"all" | "hot" | "warm" | "cold">("all");
  const [sortBy, setSortBy] = useState<"date" | "score">("date");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = useMemo(() => {
    return leads
      .filter((lead) => {
        const matchesSearch = 
          lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (lead.company?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
        
        const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
        const matchesSource = sourceFilter === "all" || lead.source === sourceFilter;
        
        let matchesScore = true;
        if (scoreFilter === "hot") matchesScore = lead.score >= 80;
        else if (scoreFilter === "warm") matchesScore = lead.score >= 50 && lead.score < 80;
        else if (scoreFilter === "cold") matchesScore = lead.score < 50;

        return matchesSearch && matchesStatus && matchesSource && matchesScore;
      })
      .sort((a, b) => {
        if (sortBy === "score") return b.score - a.score;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }, [leads, searchQuery, statusFilter, sourceFilter, scoreFilter, sortBy]);

  const formatWhatsApp = (phone: string | null) => {
    if (!phone) return null;
    const cleaned = phone.replace(/\D/g, "");
    return `https://wa.me/${cleaned}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-amber bg-amber/20";
    if (score >= 50) return "text-primary bg-primary/20";
    return "text-muted-foreground bg-muted";
  };

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Score Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-border">
                <Filter className="w-4 h-4 mr-2" />
                Score
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setScoreFilter("all")}>
                Todos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setScoreFilter("hot")}>
                🔥 Hot ({">"}80)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setScoreFilter("warm")}>
                Warm (50-79)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setScoreFilter("cold")}>
                Cold ({"<"}50)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Source Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-border">
                Source
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSourceFilter("all")}>
                Todos
              </DropdownMenuItem>
              {Object.entries(sourceLabels).map(([key, { label }]) => (
                <DropdownMenuItem key={key} onClick={() => setSourceFilter(key)}>
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-border">
                Status
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                Todos
              </DropdownMenuItem>
              {Object.entries(statusConfig).map(([key, { label }]) => (
                <DropdownMenuItem key={key} onClick={() => setStatusFilter(key as LeadStatus)}>
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort */}
          <Button 
            variant="outline" 
            size="sm" 
            className="border-border"
            onClick={() => setSortBy(sortBy === "date" ? "score" : "date")}
          >
            <ArrowUpDown className="w-4 h-4 mr-2" />
            {sortBy === "date" ? "Data" : "Score"}
          </Button>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh}
            disabled={loading}
            className="border-border"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>

          <AddLeadModal onLeadAdded={onRefresh} />
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredLeads.length} leads encontrados
        </p>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Lead</TableHead>
              <TableHead className="text-muted-foreground">Source</TableHead>
              <TableHead className="text-muted-foreground">Score</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Última Atividade</TableHead>
              <TableHead className="text-muted-foreground text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                  Nenhum lead encontrado
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead, index) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="border-border hover:bg-muted/30 cursor-pointer group"
                  onClick={() => setSelectedLead(lead)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {lead.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{lead.name}</p>
                        <p className="text-sm text-muted-foreground">{lead.company || lead.email}</p>
                      </div>
                      {lead.phone && (
                        <a
                          href={formatWhatsApp(lead.phone) || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg bg-emerald/10 hover:bg-emerald/20"
                        >
                          <MessageCircle className="w-4 h-4 text-emerald" />
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={sourceLabels[lead.source || "website"]?.color || "bg-muted"}
                    >
                      {sourceLabels[lead.source || "website"]?.label || lead.source}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            lead.score >= 80 
                              ? "bg-gradient-to-r from-amber to-amber-light" 
                              : lead.score >= 50 
                                ? "bg-primary" 
                                : "bg-muted-foreground"
                          }`}
                          style={{ width: `${lead.score}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium px-2 py-0.5 rounded ${getScoreColor(lead.score)}`}>
                        {lead.score}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="cursor-pointer">
                          <Badge variant="outline" className={`${statusConfig[lead.status].color} hover:opacity-80 transition-opacity`}>
                            {statusConfig[lead.status].label}
                            <ChevronDown className="w-3 h-3 ml-1 inline" />
                          </Badge>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {Object.entries(statusConfig).map(([key, { label, color }]) => (
                          <DropdownMenuItem 
                            key={key} 
                            onClick={() => onUpdateStatus(lead.id, key as LeadStatus)}
                            className={lead.status === key ? "bg-muted" : ""}
                          >
                            <span className={`w-2 h-2 rounded-full mr-2 ${color.split(' ')[0]}`} />
                            {label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(lead.last_activity), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(lead.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Detail Panel */}
      {selectedLead && (
        <LeadDetailPanel lead={selectedLead} onClose={() => setSelectedLead(null)} />
      )}
    </div>
  );
};
