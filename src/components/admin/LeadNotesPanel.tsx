import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus,
  StickyNote,
  Phone,
  Mail,
  Calendar,
  Users,
  CheckCircle,
  Circle,
  Trash2,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { format, formatDistanceToNow, isPast, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

interface LeadNote {
  id: string;
  lead_id: string;
  user_id: string;
  content: string;
  note_type: string;
  follow_up_date: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

interface LeadNotesPanelProps {
  leadId: string;
  leadName: string;
}

const noteTypeConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  note: { label: "Nota", icon: StickyNote, color: "bg-muted text-muted-foreground" },
  follow_up: { label: "Follow-up", icon: Clock, color: "bg-amber/20 text-amber" },
  call: { label: "Ligação", icon: Phone, color: "bg-primary/20 text-primary" },
  email: { label: "Email", icon: Mail, color: "bg-emerald/20 text-emerald" },
  meeting: { label: "Reunião", icon: Users, color: "bg-purple-500/20 text-purple-500" },
};

export const LeadNotesPanel = ({ leadId, leadName }: LeadNotesPanelProps) => {
  const { toast } = useToast();
  const [notes, setNotes] = useState<LeadNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState({
    content: "",
    note_type: "note",
    follow_up_date: ""
  });

  useEffect(() => {
    fetchNotes();
  }, [leadId]);

  const fetchNotes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("lead_notes")
      .select("*")
      .eq("lead_id", leadId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching notes:", error);
    } else {
      setNotes(data || []);
    }
    setLoading(false);
  };

  const handleAddNote = async () => {
    if (!newNote.content.trim()) {
      toast({
        title: "Conteúdo obrigatório",
        description: "Por favor, adicione um conteúdo para a nota.",
        variant: "destructive"
      });
      return;
    }

    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      toast({
        title: "Erro de autenticação",
        variant: "destructive"
      });
      return;
    }

    const { error } = await supabase
      .from("lead_notes")
      .insert({
        lead_id: leadId,
        user_id: userData.user.id,
        content: newNote.content,
        note_type: newNote.note_type,
        follow_up_date: newNote.follow_up_date || null
      });

    if (error) {
      toast({
        title: "Erro ao adicionar nota",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Nota adicionada!",
        description: newNote.note_type === "follow_up" 
          ? "Follow-up agendado com sucesso."
          : "A nota foi salva com sucesso."
      });
      setNewNote({ content: "", note_type: "note", follow_up_date: "" });
      setIsAdding(false);
      fetchNotes();
    }
  };

  const handleToggleComplete = async (noteId: string, completed: boolean) => {
    const { error } = await supabase
      .from("lead_notes")
      .update({ completed: !completed })
      .eq("id", noteId);

    if (error) {
      toast({
        title: "Erro ao atualizar",
        variant: "destructive"
      });
    } else {
      fetchNotes();
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    const { error } = await supabase
      .from("lead_notes")
      .delete()
      .eq("id", noteId);

    if (error) {
      toast({
        title: "Erro ao excluir",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Nota excluída"
      });
      fetchNotes();
    }
  };

  const upcomingFollowUps = notes.filter(note => 
    note.note_type === "follow_up" && 
    note.follow_up_date && 
    !note.completed
  );

  const overdueFollowUps = upcomingFollowUps.filter(note => 
    note.follow_up_date && isPast(new Date(note.follow_up_date)) && !isToday(new Date(note.follow_up_date))
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">Notas & Follow-ups</h3>
        <Button 
          onClick={() => setIsAdding(!isAdding)} 
          variant="outline" 
          size="sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          Adicionar
        </Button>
      </div>

      {/* Overdue Alert */}
      {overdueFollowUps.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg"
        >
          <p className="text-sm text-destructive font-medium">
            ⚠️ {overdueFollowUps.length} follow-up(s) atrasado(s)
          </p>
        </motion.div>
      )}

      {/* Add Note Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 bg-muted/50 rounded-lg border border-border space-y-3"
          >
            <div className="flex gap-2">
              <Select 
                value={newNote.note_type} 
                onValueChange={(value) => setNewNote(prev => ({ ...prev, note_type: value }))}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(noteTypeConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        <config.icon className="w-4 h-4" />
                        {config.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(newNote.note_type === "follow_up" || newNote.note_type === "meeting") && (
                <Input
                  type="datetime-local"
                  value={newNote.follow_up_date}
                  onChange={(e) => setNewNote(prev => ({ ...prev, follow_up_date: e.target.value }))}
                  className="flex-1"
                />
              )}
            </div>

            <Textarea
              placeholder={
                newNote.note_type === "follow_up" 
                  ? "Descreva o follow-up planejado..."
                  : newNote.note_type === "call"
                    ? "Resumo da ligação..."
                    : newNote.note_type === "email"
                      ? "Resumo do email enviado..."
                      : newNote.note_type === "meeting"
                        ? "Pauta/anotações da reunião..."
                        : "Adicione uma nota sobre este lead..."
              }
              value={newNote.content}
              onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
              rows={3}
            />

            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>
                Cancelar
              </Button>
              <Button size="sm" onClick={handleAddNote}>
                Salvar
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {loading ? (
          <div className="text-center py-4 text-muted-foreground text-sm">
            Carregando...
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            <StickyNote className="w-8 h-8 mx-auto mb-2 opacity-50" />
            Nenhuma nota ainda
          </div>
        ) : (
          <AnimatePresence>
            {notes.map((note, index) => {
              const config = noteTypeConfig[note.note_type] || noteTypeConfig.note;
              const Icon = config.icon;
              const isOverdue = note.follow_up_date && isPast(new Date(note.follow_up_date)) && !isToday(new Date(note.follow_up_date)) && !note.completed;

              return (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-3 rounded-lg border ${
                    note.completed 
                      ? "bg-muted/30 border-border opacity-60" 
                      : isOverdue
                        ? "bg-destructive/5 border-destructive/30"
                        : "bg-card border-border"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Toggle Complete */}
                    {(note.note_type === "follow_up" || note.note_type === "call" || note.note_type === "meeting") && (
                      <button
                        onClick={() => handleToggleComplete(note.id, note.completed)}
                        className="mt-0.5"
                      >
                        {note.completed ? (
                          <CheckCircle className="w-5 h-5 text-emerald" />
                        ) : (
                          <Circle className={`w-5 h-5 ${isOverdue ? "text-destructive" : "text-muted-foreground"}`} />
                        )}
                      </button>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={`${config.color} text-xs`}>
                          <Icon className="w-3 h-3 mr-1" />
                          {config.label}
                        </Badge>
                        {isOverdue && (
                          <Badge variant="destructive" className="text-xs">
                            Atrasado
                          </Badge>
                        )}
                        {note.follow_up_date && isToday(new Date(note.follow_up_date)) && !note.completed && (
                          <Badge className="bg-amber/20 text-amber text-xs">
                            Hoje
                          </Badge>
                        )}
                      </div>

                      <p className={`text-sm ${note.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {note.content}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {note.follow_up_date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {format(new Date(note.follow_up_date), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                            </span>
                          )}
                          <span>
                            {formatDistanceToNow(new Date(note.created_at), { addSuffix: true, locale: ptBR })}
                          </span>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:text-destructive"
                          onClick={() => handleDeleteNote(note.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
