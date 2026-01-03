import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Json } from "@/integrations/supabase/types";
import {
  Building2, 
  Mail, 
  Target, 
  Link2, 
  Bell, 
  Shield, 
  Globe,
  MessageSquare,
  Zap,
  Save,
  ExternalLink,
  Copy,
  Check,
  Loader2,
  BarChart3,
  Users,
  TrendingUp,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SalesGoal {
  id?: string;
  month: number;
  year: number;
  leads_goal: number;
  conversions_goal: number;
  revenue_goal: number | null;
}

interface CompanySettings {
  name: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  cnpj: string;
  socialLinkedin: string;
  socialInstagram: string;
  socialFacebook: string;
}

interface EmailSettings {
  senderName: string;
  senderEmail: string;
  replyTo: string;
  signature: string;
  autoResponder: boolean;
  dailyDigest: boolean;
  newLeadNotification: boolean;
  statusChangeNotification: boolean;
}

interface IntegrationsSettings {
  googleAnalyticsId: string;
  facebookPixelId: string;
  whatsappNumber: string;
  whatsappApiKey: string;
  zapierWebhook: string;
  slackWebhook: string;
}

interface NotificationsSettings {
  emailOnNewLead: boolean;
  emailOnStatusChange: boolean;
  emailDailyDigest: boolean;
  browserNotifications: boolean;
  slackNotifications: boolean;
  whatsappNotifications: boolean;
}

export const SettingsPanel = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("company");

  // Company settings state
  const [companySettings, setCompanySettings] = useState<CompanySettings>({
    name: "Minerattum",
    email: "contato@minerattum.com",
    phone: "(11) 99999-9999",
    website: "https://minerattum.com",
    address: "São Paulo, SP - Brasil",
    cnpj: "",
    socialLinkedin: "",
    socialInstagram: "",
    socialFacebook: "",
  });

  // Email settings state
  const [emailSettings, setEmailSettings] = useState<EmailSettings>({
    senderName: "Minerattum",
    senderEmail: "contato@minerattum.com",
    replyTo: "contato@minerattum.com",
    signature: "Atenciosamente,\nEquipe Minerattum",
    autoResponder: true,
    dailyDigest: true,
    newLeadNotification: true,
    statusChangeNotification: true,
  });

  // Sales goals state
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const [salesGoals, setSalesGoals] = useState<SalesGoal>({
    month: currentMonth,
    year: currentYear,
    leads_goal: 100,
    conversions_goal: 10,
    revenue_goal: 50000,
  });

  // Integrations state
  const [integrations, setIntegrations] = useState<IntegrationsSettings>({
    googleAnalyticsId: "",
    facebookPixelId: "",
    whatsappNumber: "",
    whatsappApiKey: "",
    zapierWebhook: "",
    slackWebhook: "",
  });

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationsSettings>({
    emailOnNewLead: true,
    emailOnStatusChange: true,
    emailDailyDigest: false,
    browserNotifications: true,
    slackNotifications: false,
    whatsappNotifications: false,
  });

  // Load all settings on mount
  useEffect(() => {
    loadAllSettings();
  }, []);

  const loadAllSettings = async () => {
    setLoading(true);
    try {
      // Load settings from database
      const { data: settingsData, error: settingsError } = await supabase
        .from("settings")
        .select("*");

      if (settingsError) throw settingsError;

      if (settingsData) {
        settingsData.forEach((setting: { key: string; value: unknown }) => {
          switch (setting.key) {
            case 'company':
              setCompanySettings(setting.value as CompanySettings);
              break;
            case 'email':
              setEmailSettings(setting.value as EmailSettings);
              break;
            case 'integrations':
              setIntegrations(setting.value as IntegrationsSettings);
              break;
            case 'notifications':
              setNotifications(setting.value as NotificationsSettings);
              break;
          }
        });
      }

      // Load sales goals
      const { data: goalsData } = await supabase
        .from("sales_goals")
        .select("*")
        .eq("month", currentMonth)
        .eq("year", currentYear)
        .single();

      if (goalsData) {
        setSalesGoals(goalsData);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
      toast({
        title: "Erro ao carregar configurações",
        description: "Usando valores padrão.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (settingKey: string, settingValue: unknown, category: string) => {
    setSaving(true);
    try {
      // First try to update existing record
      const { data: existing } = await supabase
        .from("settings")
        .select("id")
        .eq("key", settingKey)
        .single();

      if (existing) {
        const { error } = await supabase
          .from("settings")
          .update({ value: settingValue as Json, category })
          .eq("key", settingKey);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("settings")
          .insert([{ key: settingKey, value: settingValue as Json, category }]);
        if (error) throw error;
      }

      toast({
        title: "Configurações salvas",
        description: "Suas configurações foram atualizadas com sucesso.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as configurações.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCompanySettings = () => saveSettings('company', companySettings, 'company');
  const handleSaveEmailSettings = () => saveSettings('email', emailSettings, 'email');
  const handleSaveIntegrations = () => saveSettings('integrations', integrations, 'integrations');
  const handleSaveNotifications = () => saveSettings('notifications', notifications, 'notifications');

  const handleSaveSalesGoals = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("sales_goals")
        .upsert({
          ...salesGoals,
          month: currentMonth,
          year: currentYear,
        }, {
          onConflict: 'month,year'
        });

      if (error) throw error;

      toast({
        title: "Metas salvas",
        description: "As metas de vendas foram atualizadas com sucesso.",
      });
    } catch (error) {
      console.error("Error saving goals:", error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as metas.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const settingsTabs = [
    { id: "company", label: "Empresa", icon: Building2 },
    { id: "email", label: "Email", icon: Mail },
    { id: "goals", label: "Metas", icon: Target },
    { id: "integrations", label: "Integrações", icon: Link2 },
    { id: "notifications", label: "Notificações", icon: Bell },
    { id: "security", label: "Segurança", icon: Shield },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Carregando configurações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as configurações do seu painel de marketing e vendas</p>
        </div>
        <Button variant="outline" size="sm" onClick={loadAllSettings} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Recarregar
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <Card className="lg:w-64 shrink-0">
          <CardContent className="p-2">
            <nav className="space-y-1">
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          {/* Company Settings */}
          {activeTab === "company" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    Informações da Empresa
                  </CardTitle>
                  <CardDescription>
                    Configure as informações básicas da sua empresa que serão usadas em comunicações e relatórios.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Nome da Empresa</Label>
                      <Input
                        id="company-name"
                        value={companySettings.name}
                        onChange={(e) => setCompanySettings({ ...companySettings, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-cnpj">CNPJ</Label>
                      <Input
                        id="company-cnpj"
                        placeholder="00.000.000/0000-00"
                        value={companySettings.cnpj}
                        onChange={(e) => setCompanySettings({ ...companySettings, cnpj: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-email">Email Principal</Label>
                      <Input
                        id="company-email"
                        type="email"
                        value={companySettings.email}
                        onChange={(e) => setCompanySettings({ ...companySettings, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-phone">Telefone</Label>
                      <Input
                        id="company-phone"
                        value={companySettings.phone}
                        onChange={(e) => setCompanySettings({ ...companySettings, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-website">Website</Label>
                      <Input
                        id="company-website"
                        value={companySettings.website}
                        onChange={(e) => setCompanySettings({ ...companySettings, website: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-address">Endereço</Label>
                      <Input
                        id="company-address"
                        value={companySettings.address}
                        onChange={(e) => setCompanySettings({ ...companySettings, address: e.target.value })}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-4 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-primary" />
                      Redes Sociais
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="social-linkedin">LinkedIn</Label>
                        <Input
                          id="social-linkedin"
                          placeholder="https://linkedin.com/company/..."
                          value={companySettings.socialLinkedin}
                          onChange={(e) => setCompanySettings({ ...companySettings, socialLinkedin: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="social-instagram">Instagram</Label>
                        <Input
                          id="social-instagram"
                          placeholder="@suaempresa"
                          value={companySettings.socialInstagram}
                          onChange={(e) => setCompanySettings({ ...companySettings, socialInstagram: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="social-facebook">Facebook</Label>
                        <Input
                          id="social-facebook"
                          placeholder="https://facebook.com/..."
                          value={companySettings.socialFacebook}
                          onChange={(e) => setCompanySettings({ ...companySettings, socialFacebook: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={handleSaveCompanySettings} disabled={saving}>
                  {saving ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Salvar Alterações
                </Button>
              </div>
            </motion.div>
          )}

          {/* Email Settings */}
          {activeTab === "email" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    Configurações de Email
                  </CardTitle>
                  <CardDescription>
                    Configure como os emails serão enviados para seus leads e equipe.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sender-name">Nome do Remetente</Label>
                      <Input
                        id="sender-name"
                        value={emailSettings.senderName}
                        onChange={(e) => setEmailSettings({ ...emailSettings, senderName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sender-email">Email do Remetente</Label>
                      <Input
                        id="sender-email"
                        type="email"
                        value={emailSettings.senderEmail}
                        onChange={(e) => setEmailSettings({ ...emailSettings, senderEmail: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reply-to">Email para Respostas (Reply-To)</Label>
                    <Input
                      id="reply-to"
                      type="email"
                      value={emailSettings.replyTo}
                      onChange={(e) => setEmailSettings({ ...emailSettings, replyTo: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signature">Assinatura Padrão</Label>
                    <Textarea
                      id="signature"
                      rows={4}
                      value={emailSettings.signature}
                      onChange={(e) => setEmailSettings({ ...emailSettings, signature: e.target.value })}
                    />
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-4">Automações de Email</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">Auto-responder para novos leads</p>
                          <p className="text-sm text-muted-foreground">
                            Envia automaticamente um email de boas-vindas para novos leads
                          </p>
                        </div>
                        <Switch
                          checked={emailSettings.autoResponder}
                          onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, autoResponder: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">Notificação de mudança de status</p>
                          <p className="text-sm text-muted-foreground">
                            Notifica o lead quando seu status é atualizado no funil
                          </p>
                        </div>
                        <Switch
                          checked={emailSettings.statusChangeNotification}
                          onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, statusChangeNotification: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">Resumo diário</p>
                          <p className="text-sm text-muted-foreground">
                            Receba um resumo diário de todos os novos leads
                          </p>
                        </div>
                        <Switch
                          checked={emailSettings.dailyDigest}
                          onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, dailyDigest: checked })}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-amber-500/30 bg-amber-500/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-400">
                    <Zap className="w-5 h-5" />
                    Domínio de Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Para enviar emails do domínio <strong>minerattum.com</strong>, você precisa verificar o domínio no Resend.
                  </p>
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Configurar Domínio no Resend
                  </Button>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={handleSaveEmailSettings} disabled={saving}>
                  {saving ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Salvar Alterações
                </Button>
              </div>
            </motion.div>
          )}

          {/* Sales Goals */}
          {activeTab === "goals" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Metas de Vendas - {new Date().toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
                  </CardTitle>
                  <CardDescription>
                    Configure as metas mensais de leads, conversões e receita para acompanhar seu progresso.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="leads-goal" className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        Meta de Leads
                      </Label>
                      <Input
                        id="leads-goal"
                        type="number"
                        min={0}
                        value={salesGoals.leads_goal}
                        onChange={(e) => setSalesGoals({ ...salesGoals, leads_goal: parseInt(e.target.value) || 0 })}
                      />
                      <p className="text-xs text-muted-foreground">Quantidade de leads para captar no mês</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="conversions-goal" className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        Meta de Conversões
                      </Label>
                      <Input
                        id="conversions-goal"
                        type="number"
                        min={0}
                        value={salesGoals.conversions_goal}
                        onChange={(e) => setSalesGoals({ ...salesGoals, conversions_goal: parseInt(e.target.value) || 0 })}
                      />
                      <p className="text-xs text-muted-foreground">Leads convertidos em clientes</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="revenue-goal" className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-amber-500" />
                        Meta de Receita (R$)
                      </Label>
                      <Input
                        id="revenue-goal"
                        type="number"
                        min={0}
                        value={salesGoals.revenue_goal || 0}
                        onChange={(e) => setSalesGoals({ ...salesGoals, revenue_goal: parseInt(e.target.value) || 0 })}
                      />
                      <p className="text-xs text-muted-foreground">Receita esperada no mês</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Métricas Calculadas</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Taxa de Conversão Alvo</p>
                        <p className="text-lg font-semibold text-emerald-500">
                          {salesGoals.leads_goal > 0 
                            ? Math.round((salesGoals.conversions_goal / salesGoals.leads_goal) * 100) 
                            : 0}%
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Ticket Médio Alvo</p>
                        <p className="text-lg font-semibold text-amber-500">
                          {salesGoals.conversions_goal > 0 
                            ? `R$ ${Math.round((salesGoals.revenue_goal || 0) / salesGoals.conversions_goal).toLocaleString('pt-BR')}` 
                            : 'R$ 0'}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">CAC Máximo Sugerido</p>
                        <p className="text-lg font-semibold text-primary">
                          {salesGoals.conversions_goal > 0 && salesGoals.revenue_goal
                            ? `R$ ${Math.round(((salesGoals.revenue_goal || 0) * 0.3) / salesGoals.conversions_goal).toLocaleString('pt-BR')}`
                            : 'R$ 0'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={handleSaveSalesGoals} disabled={saving}>
                  {saving ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Salvar Metas
                </Button>
              </div>
            </motion.div>
          )}

          {/* Integrations */}
          {activeTab === "integrations" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Analytics & Tracking
                  </CardTitle>
                  <CardDescription>
                    Configure suas ferramentas de análise e rastreamento de conversões.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ga-id">Google Analytics ID</Label>
                    <div className="flex gap-2">
                      <Input
                        id="ga-id"
                        placeholder="G-XXXXXXXXXX"
                        value={integrations.googleAnalyticsId}
                        onChange={(e) => setIntegrations({ ...integrations, googleAnalyticsId: e.target.value })}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleCopy(integrations.googleAnalyticsId, 'ga')}
                      >
                        {copied === 'ga' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fb-pixel">Facebook Pixel ID</Label>
                    <div className="flex gap-2">
                      <Input
                        id="fb-pixel"
                        placeholder="XXXXXXXXXXXXXXX"
                        value={integrations.facebookPixelId}
                        onChange={(e) => setIntegrations({ ...integrations, facebookPixelId: e.target.value })}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleCopy(integrations.facebookPixelId, 'fb')}
                      >
                        {copied === 'fb' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-emerald-500" />
                    WhatsApp Business API
                  </CardTitle>
                  <CardDescription>
                    Integre com WhatsApp para envio automático de mensagens aos leads.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="wa-number">Número do WhatsApp</Label>
                      <Input
                        id="wa-number"
                        placeholder="+55 11 99999-9999"
                        value={integrations.whatsappNumber}
                        onChange={(e) => setIntegrations({ ...integrations, whatsappNumber: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wa-api">API Key</Label>
                      <Input
                        id="wa-api"
                        type="password"
                        placeholder="Sua chave de API"
                        value={integrations.whatsappApiKey}
                        onChange={(e) => setIntegrations({ ...integrations, whatsappApiKey: e.target.value })}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Requer uma conta WhatsApp Business API aprovada pelo Meta.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" />
                    Automações
                  </CardTitle>
                  <CardDescription>
                    Configure webhooks para integrar com Zapier, Make, ou outras ferramentas.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="zapier-webhook">Zapier Webhook URL</Label>
                    <Input
                      id="zapier-webhook"
                      placeholder="https://hooks.zapier.com/..."
                      value={integrations.zapierWebhook}
                      onChange={(e) => setIntegrations({ ...integrations, zapierWebhook: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Será acionado quando um novo lead for cadastrado.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                    <Input
                      id="slack-webhook"
                      placeholder="https://hooks.slack.com/..."
                      value={integrations.slackWebhook}
                      onChange={(e) => setIntegrations({ ...integrations, slackWebhook: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Receba notificações de novos leads diretamente no Slack.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={handleSaveIntegrations} disabled={saving}>
                  {saving ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Salvar Integrações
                </Button>
              </div>
            </motion.div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Preferências de Notificação
                  </CardTitle>
                  <CardDescription>
                    Configure como e quando você deseja receber notificações sobre seus leads.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Email ao receber novo lead</p>
                      <p className="text-sm text-muted-foreground">
                        Receba um email sempre que um novo lead entrar no sistema
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailOnNewLead}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailOnNewLead: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Email ao mudar status do lead</p>
                      <p className="text-sm text-muted-foreground">
                        Receba um email quando um lead avançar no funil
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailOnStatusChange}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailOnStatusChange: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Resumo diário por email</p>
                      <p className="text-sm text-muted-foreground">
                        Receba um resumo diário com todas as atividades do dia
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailDailyDigest}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailDailyDigest: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Notificações no navegador</p>
                      <p className="text-sm text-muted-foreground">
                        Receba notificações push no navegador
                      </p>
                    </div>
                    <Switch
                      checked={notifications.browserNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, browserNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Notificações no Slack</p>
                      <p className="text-sm text-muted-foreground">
                        Requer configuração do webhook nas integrações
                      </p>
                    </div>
                    <Switch
                      checked={notifications.slackNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, slackNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Notificações no WhatsApp</p>
                      <p className="text-sm text-muted-foreground">
                        Requer configuração da API nas integrações
                      </p>
                    </div>
                    <Switch
                      checked={notifications.whatsappNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, whatsappNotifications: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={handleSaveNotifications} disabled={saving}>
                  {saving ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Salvar Preferências
                </Button>
              </div>
            </motion.div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Segurança da Conta
                  </CardTitle>
                  <CardDescription>
                    Gerencie as configurações de segurança da sua conta e acesso ao dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Check className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="font-medium text-emerald-400">Autenticação Ativa</p>
                        <p className="text-sm text-muted-foreground">
                          Sua conta está protegida com autenticação segura
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Sessões Ativas</h4>
                    <div className="p-4 bg-muted/50 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="font-medium">Navegador atual</p>
                        <p className="text-sm text-muted-foreground">
                          Última atividade: agora
                        </p>
                      </div>
                      <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">
                        Ativa
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Controle de Acesso</h4>
                    <p className="text-sm text-muted-foreground">
                      Apenas usuários com a role "admin" podem acessar este dashboard. 
                      O acesso é controlado por políticas de segurança no banco de dados (RLS).
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-destructive/30">
                <CardHeader>
                  <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Ações irreversíveis. Tenha cuidado ao utilizar estas opções.
                  </p>
                  <div className="flex gap-4">
                    <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                      Exportar Todos os Dados
                    </Button>
                    <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                      Limpar Leads de Teste
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
