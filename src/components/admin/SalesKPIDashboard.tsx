import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Target, 
  TrendingUp, 
  TrendingDown,
  Users,
  CheckCircle,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Edit3,
  Save,
  X
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { Lead } from "./types";
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

interface SalesKPIDashboardProps {
  leads: Lead[];
}

interface SalesGoal {
  id: string;
  month: number;
  year: number;
  leads_goal: number;
  conversions_goal: number;
  revenue_goal: number;
}

export const SalesKPIDashboard = ({ leads }: SalesKPIDashboardProps) => {
  const { toast } = useToast();
  const [currentGoal, setCurrentGoal] = useState<SalesGoal | null>(null);
  const [previousGoal, setPreviousGoal] = useState<SalesGoal | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoals, setEditedGoals] = useState({
    leads_goal: 0,
    conversions_goal: 0,
    revenue_goal: 0
  });

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const previousMonth = subMonths(currentDate, 1).getMonth() + 1;
  const previousYear = subMonths(currentDate, 1).getFullYear();

  // Calculate current month stats
  const currentMonthStart = startOfMonth(currentDate);
  const currentMonthEnd = endOfMonth(currentDate);
  const previousMonthStart = startOfMonth(subMonths(currentDate, 1));
  const previousMonthEnd = endOfMonth(subMonths(currentDate, 1));

  const currentMonthLeads = leads.filter(lead => 
    isWithinInterval(new Date(lead.created_at), { start: currentMonthStart, end: currentMonthEnd })
  );

  const previousMonthLeads = leads.filter(lead => 
    isWithinInterval(new Date(lead.created_at), { start: previousMonthStart, end: previousMonthEnd })
  );

  const currentMonthConversions = currentMonthLeads.filter(lead => lead.status === "closed").length;
  const previousMonthConversions = previousMonthLeads.filter(lead => lead.status === "closed").length;

  // Estimated revenue (mock - in real app this would come from actual sales data)
  const avgDealValue = 15000; // R$ 15,000 average deal
  const currentMonthRevenue = currentMonthConversions * avgDealValue;
  const previousMonthRevenue = previousMonthConversions * avgDealValue;

  // Calculate percentage changes
  const leadsChange = previousMonthLeads.length > 0 
    ? ((currentMonthLeads.length - previousMonthLeads.length) / previousMonthLeads.length) * 100 
    : 100;
  
  const conversionsChange = previousMonthConversions > 0 
    ? ((currentMonthConversions - previousMonthConversions) / previousMonthConversions) * 100 
    : 100;

  const revenueChange = previousMonthRevenue > 0 
    ? ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100 
    : 100;

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    // Fetch current month goal
    const { data: current } = await supabase
      .from("sales_goals")
      .select("*")
      .eq("month", currentMonth)
      .eq("year", currentYear)
      .maybeSingle();

    // Fetch previous month goal
    const { data: previous } = await supabase
      .from("sales_goals")
      .select("*")
      .eq("month", previousMonth)
      .eq("year", previousYear)
      .maybeSingle();

    if (current) {
      setCurrentGoal(current);
      setEditedGoals({
        leads_goal: current.leads_goal,
        conversions_goal: current.conversions_goal,
        revenue_goal: Number(current.revenue_goal)
      });
    }
    if (previous) {
      setPreviousGoal(previous);
    }
  };

  const handleSaveGoals = async () => {
    const { error } = await supabase
      .from("sales_goals")
      .upsert({
        month: currentMonth,
        year: currentYear,
        leads_goal: editedGoals.leads_goal,
        conversions_goal: editedGoals.conversions_goal,
        revenue_goal: editedGoals.revenue_goal
      }, { onConflict: "month,year" });

    if (error) {
      toast({
        title: "Erro ao salvar metas",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Metas salvas!",
        description: "As metas do mês foram atualizadas com sucesso."
      });
      setIsEditing(false);
      fetchGoals();
    }
  };

  const leadsProgress = currentGoal?.leads_goal 
    ? Math.min((currentMonthLeads.length / currentGoal.leads_goal) * 100, 100) 
    : 0;
  
  const conversionsProgress = currentGoal?.conversions_goal 
    ? Math.min((currentMonthConversions / currentGoal.conversions_goal) * 100, 100) 
    : 0;

  const revenueProgress = currentGoal?.revenue_goal 
    ? Math.min((currentMonthRevenue / Number(currentGoal.revenue_goal)) * 100, 100) 
    : 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dashboard de Vendas</h2>
          <p className="text-muted-foreground">
            {format(currentDate, "MMMM yyyy", { locale: ptBR })}
          </p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            <Edit3 className="w-4 h-4 mr-2" />
            Editar Metas
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSaveGoals} variant="default">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
            <Button onClick={() => setIsEditing(false)} variant="outline">
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
          </div>
        )}
      </div>

      {/* Goals Editor */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg border border-border"
        >
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Meta de Leads</label>
            <Input
              type="number"
              value={editedGoals.leads_goal}
              onChange={(e) => setEditedGoals(prev => ({ ...prev, leads_goal: parseInt(e.target.value) || 0 }))}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Meta de Conversões</label>
            <Input
              type="number"
              value={editedGoals.conversions_goal}
              onChange={(e) => setEditedGoals(prev => ({ ...prev, conversions_goal: parseInt(e.target.value) || 0 }))}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Meta de Receita (R$)</label>
            <Input
              type="number"
              value={editedGoals.revenue_goal}
              onChange={(e) => setEditedGoals(prev => ({ ...prev, revenue_goal: parseFloat(e.target.value) || 0 }))}
            />
          </div>
        </motion.div>
      )}

      {/* KPI Cards with Goals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Leads Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Leads do Mês
                </span>
                <span className={`flex items-center text-xs ${leadsChange >= 0 ? 'text-emerald' : 'text-destructive'}`}>
                  {leadsChange >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(leadsChange).toFixed(1)}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between mb-3">
                <span className="text-4xl font-bold text-foreground">{currentMonthLeads.length}</span>
                {currentGoal?.leads_goal && (
                  <span className="text-sm text-muted-foreground">
                    / {currentGoal.leads_goal}
                  </span>
                )}
              </div>
              {currentGoal?.leads_goal && (
                <div className="space-y-1">
                  <Progress value={leadsProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {leadsProgress.toFixed(0)}% da meta
                  </p>
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                Mês anterior: {previousMonthLeads.length}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Conversions Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-emerald/10 to-emerald/5 border-emerald/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Conversões
                </span>
                <span className={`flex items-center text-xs ${conversionsChange >= 0 ? 'text-emerald' : 'text-destructive'}`}>
                  {conversionsChange >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(conversionsChange).toFixed(1)}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between mb-3">
                <span className="text-4xl font-bold text-foreground">{currentMonthConversions}</span>
                {currentGoal?.conversions_goal && (
                  <span className="text-sm text-muted-foreground">
                    / {currentGoal.conversions_goal}
                  </span>
                )}
              </div>
              {currentGoal?.conversions_goal && (
                <div className="space-y-1">
                  <Progress value={conversionsProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {conversionsProgress.toFixed(0)}% da meta
                  </p>
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                Taxa: {currentMonthLeads.length > 0 
                  ? ((currentMonthConversions / currentMonthLeads.length) * 100).toFixed(1) 
                  : 0}%
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Revenue Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-amber/10 to-amber/5 border-amber/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Receita Estimada
                </span>
                <span className={`flex items-center text-xs ${revenueChange >= 0 ? 'text-emerald' : 'text-destructive'}`}>
                  {revenueChange >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(revenueChange).toFixed(1)}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between mb-3">
                <span className="text-3xl font-bold text-foreground">{formatCurrency(currentMonthRevenue)}</span>
              </div>
              {currentGoal?.revenue_goal && Number(currentGoal.revenue_goal) > 0 && (
                <div className="space-y-1">
                  <Progress value={revenueProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {revenueProgress.toFixed(0)}% da meta ({formatCurrency(Number(currentGoal.revenue_goal))})
                  </p>
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                Mês anterior: {formatCurrency(previousMonthRevenue)}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Comparison with Previous Month */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="w-5 h-5 text-primary" />
            Comparativo Mensal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Período</p>
              <p className="font-semibold text-foreground">
                {format(currentDate, "MMM yy", { locale: ptBR })} vs {format(subMonths(currentDate, 1), "MMM yy", { locale: ptBR })}
              </p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Leads</p>
              <div className="flex items-center justify-center gap-2">
                <span className="font-semibold text-foreground">{currentMonthLeads.length}</span>
                <span className="text-muted-foreground">vs</span>
                <span className="text-muted-foreground">{previousMonthLeads.length}</span>
                {leadsChange >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-emerald" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-destructive" />
                )}
              </div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Conversões</p>
              <div className="flex items-center justify-center gap-2">
                <span className="font-semibold text-foreground">{currentMonthConversions}</span>
                <span className="text-muted-foreground">vs</span>
                <span className="text-muted-foreground">{previousMonthConversions}</span>
                {conversionsChange >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-emerald" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-destructive" />
                )}
              </div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Receita</p>
              <div className="flex items-center justify-center gap-2">
                <span className="font-semibold text-foreground">{formatCurrency(currentMonthRevenue)}</span>
                {revenueChange >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-emerald" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-destructive" />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
