import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import minerattumIcon from "@/assets/minerattum-icon.png";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const loginSchema = z.object({
  email: z.string().trim().email("E-mail inválido").max(255),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

const signupSchema = loginSchema.extend({
  fullName: z.string().trim().min(2, "Nome deve ter no mínimo 2 caracteres").max(100),
});

const resetPasswordSchema = z.object({
  email: z.string().trim().email("E-mail inválido").max(255),
});

const newPasswordSchema = z.object({
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  confirmPassword: z.string().min(6, "Confirme sua senha"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type AuthMode = "login" | "signup" | "forgot" | "reset";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signIn, signUp, resetPassword } = useAuth();

  useEffect(() => {
    // Check if user came from password reset link
    const type = searchParams.get("type");
    if (type === "recovery") {
      setMode("reset");
    }
  }, [searchParams]);

  useEffect(() => {
    if (user && mode !== "reset") {
      navigate("/admin");
    }
  }, [user, navigate, mode]);

  const validateForm = () => {
    try {
      if (mode === "login") {
        loginSchema.parse(formData);
      } else if (mode === "signup") {
        signupSchema.parse(formData);
      } else if (mode === "forgot") {
        resetPasswordSchema.parse(formData);
      } else if (mode === "reset") {
        newPasswordSchema.parse(formData);
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      if (mode === "login") {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast({
            title: "Erro ao entrar",
            description: error.message === "Invalid login credentials" 
              ? "Credenciais inválidas. Verifique seu e-mail e senha."
              : error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Bem-vindo!",
            description: "Login realizado com sucesso.",
          });
          navigate("/admin");
        }
      } else if (mode === "signup") {
        const { error } = await signUp(formData.email, formData.password, formData.fullName);
        if (error) {
          toast({
            title: "Erro ao cadastrar",
            description: error.message.includes("already registered")
              ? "Este e-mail já está cadastrado."
              : error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Conta criada!",
            description: "Sua conta foi criada com sucesso.",
          });
          navigate("/admin");
        }
      } else if (mode === "forgot") {
        const { error } = await resetPassword(formData.email);
        if (error) {
          toast({
            title: "Erro ao enviar e-mail",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "E-mail enviado!",
            description: "Verifique sua caixa de entrada para redefinir sua senha.",
          });
          setMode("login");
          setFormData({ ...formData, email: "", password: "" });
        }
      } else if (mode === "reset") {
        const { error } = await supabase.auth.updateUser({
          password: formData.password,
        });
        if (error) {
          toast({
            title: "Erro ao redefinir senha",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Senha redefinida!",
            description: "Sua senha foi alterada com sucesso.",
          });
          setMode("login");
          setFormData({ email: "", password: "", confirmPassword: "", fullName: "" });
          navigate("/auth");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case "login": return "Entrar";
      case "signup": return "Criar Conta";
      case "forgot": return "Recuperar Senha";
      case "reset": return "Nova Senha";
    }
  };

  const getDescription = () => {
    switch (mode) {
      case "login": return "Acesse o painel administrativo";
      case "signup": return "Crie sua conta para acessar o painel";
      case "forgot": return "Digite seu e-mail para receber o link de recuperação";
      case "reset": return "Digite sua nova senha";
    }
  };

  const getButtonText = () => {
    if (isLoading) return "Carregando...";
    switch (mode) {
      case "login": return "Entrar";
      case "signup": return "Criar Conta";
      case "forgot": return "Enviar Link";
      case "reset": return "Redefinir Senha";
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-card/50 border border-border/50 rounded-2xl p-8 backdrop-blur-sm">
          {/* Back button for forgot/reset modes */}
          {(mode === "forgot" || mode === "reset") && (
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setErrors({});
              }}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao login
            </button>
          )}

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <img
                src={minerattumIcon}
                alt="Minerattum"
                className="h-10 sm:h-12 w-auto"
              />
              <span className="font-sans font-semibold text-xl sm:text-2xl text-foreground tracking-tight">Minerattum</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              {getTitle()}
            </h1>
            <p className="text-muted-foreground mt-2">
              {getDescription()}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name - only for signup */}
            {mode === "signup" && (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                  Nome Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Seu nome"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="pl-10 bg-background/50 border-border/50"
                  />
                </div>
                {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName}</p>}
              </div>
            )}

            {/* Email - for login, signup, and forgot */}
            {(mode === "login" || mode === "signup" || mode === "forgot") && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 bg-background/50 border-border/50"
                  />
                </div>
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
              </div>
            )}

            {/* Password - for login, signup, and reset */}
            {(mode === "login" || mode === "signup" || mode === "reset") && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  {mode === "reset" ? "Nova Senha" : "Senha"}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10 bg-background/50 border-border/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
              </div>
            )}

            {/* Confirm Password - only for reset */}
            {mode === "reset" && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="pl-10 pr-10 bg-background/50 border-border/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-destructive text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            {/* Forgot password link - only for login */}
            {mode === "login" && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => {
                    setMode("forgot");
                    setErrors({});
                  }}
                  className="text-primary hover:underline text-sm"
                >
                  Esqueceu a senha?
                </button>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {getButtonText()}
            </Button>
          </form>

          {/* Toggle between login and signup */}
          {(mode === "login" || mode === "signup") && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "login" ? "signup" : "login");
                  setErrors({});
                }}
                className="text-primary hover:underline text-sm"
              >
                {mode === "login" ? "Não tem conta? Criar agora" : "Já tem conta? Entrar"}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </main>
  );
};

export default Auth;
