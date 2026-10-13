"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/citas": "Citas",
  "/barberos": "Barberos",
  "/servicios": "Servicios",
  "/clientes": "Clientes",
};

export function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-border/60 bg-background/60 px-6 backdrop-blur-md">
      <motion.div
        key={title}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
      </motion.div>
      <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
        <span>BarberPro</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{title}</span>
      </div>
    </header>
  );
}
