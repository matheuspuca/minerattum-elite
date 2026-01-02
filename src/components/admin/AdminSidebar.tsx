import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Mail, 
  Settings,
  LogOut,
  Home,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import minerattumLogo from "@/assets/minerattum-logo-new.png";

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onSignOut: () => void;
}

const navItems = [
  { 
    label: "Dashboard", 
    icon: LayoutDashboard, 
    path: "/admin",
    end: true 
  },
  { 
    label: "Leads CRM", 
    icon: Users, 
    path: "/admin?tab=leads" 
  },
  { 
    label: "Conteúdo", 
    icon: BarChart3, 
    path: "/admin?tab=content" 
  },
  { 
    label: "Email Automations", 
    icon: Mail, 
    path: "/admin?tab=email" 
  },
  { 
    label: "Configurações", 
    icon: Settings, 
    path: "/admin?tab=settings" 
  },
];

export const AdminSidebar = ({ collapsed, onToggle, onSignOut }: AdminSidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname + location.search;

  const isActive = (path: string, end?: boolean) => {
    if (end) {
      return location.pathname === "/admin" && !location.search;
    }
    return currentPath.includes(path);
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-50 flex flex-col"
    >
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 overflow-hidden">
          <img 
            src={minerattumLogo} 
            alt="Minerattum" 
            className={cn(
              "transition-all duration-300",
              collapsed ? "h-10 w-10 object-contain" : "h-12"
            )}
          />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="flex-shrink-0 text-muted-foreground hover:text-foreground hover:bg-sidebar-hover"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.path, item.end);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                active
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-sidebar-hover"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 flex-shrink-0 transition-colors",
                active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )} />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-medium whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-hover transition-all"
        >
          <Home className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Ver Site</span>}
        </Link>
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Sair</span>}
        </button>
      </div>
    </motion.aside>
  );
};
