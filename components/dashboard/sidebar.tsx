"use client";

import {
  Home,
  MessageSquare,
  Users,
  Settings,
  BarChart2,
  SquarePercent,
  MoveUpRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Mensagens", href: "/dashboard/messages", icon: MessageSquare },
  { name: "Contatos", href: "/dashboard/users", icon: Users },
  {
    name: "Promoções",
    href: "/dashboard/promotion",
    icon: SquarePercent,
  },
  { name: "Análise", href: "/dashboard/analytics", icon: BarChart2 },
  { name: "Configurações", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="z-20 flex min-h-[calc(90vh)] w-64 flex-col border-r bg-card">
      <div className="p-6">
        <h1 className="text-2xl font-bold">WhatsApp API</h1>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center rounded-md px-4 py-2 text-sm",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent",
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <footer className="mx-auto mb-3 flex h-10 w-full max-w-[95%] items-center justify-center gap-2 rounded-md bg-primary text-center text-sm text-secondary">
        Desenvolvido por Ahxterix{" "}
        <a href="https://ahxterix.com.br" target="_blank">
          <MoveUpRight size={20} className="" />
        </a>
      </footer>
    </div>
  );
}
