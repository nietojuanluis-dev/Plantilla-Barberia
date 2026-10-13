"use client";

import { motion } from "framer-motion";
import { Clock, Scissors, Tag } from "lucide-react";
import { services, formatCurrency } from "@/lib/data";

export default function ServiciosPage() {
  const categories = ["corte", "barba", "combo", "tratamiento"] as const;

  const categoryLabel = (cat: string) => {
    switch (cat) {
      case "corte":
        return "Corte de Cabello";
      case "barba":
        return "Barba";
      case "combo":
        return "Combos";
      case "tratamiento":
        return "Tratamientos";
      default:
        return cat;
    }
  };

  return (
    <div className="space-y-8">
      {categories.map((cat, ci) => {
        const catServices = services.filter((s) => s.category === cat);
        if (catServices.length === 0) return null;
        return (
          <section key={cat}>
            <div className="mb-3 flex items-center gap-2">
              <Tag className="h-4 w-4 text-primary" />
              <h2 className="text-base font-semibold text-foreground">
                {categoryLabel(cat)}
              </h2>
              <span className="rounded-full bg-muted/40 px-2 py-0.5 text-xs text-muted-foreground">
                {catServices.length}
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {catServices.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: ci * 0.1 + i * 0.06, duration: 0.35 }}
                  className="flex flex-col justify-between rounded-xl border border-border/60 bg-card/60 p-5 backdrop-blur-md transition-colors hover:bg-card/80"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <h3 className="text-sm font-semibold text-foreground">
                        {service.name}
                      </h3>
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <Scissors className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {service.duration} min
                    </div>
                    <span className="text-lg font-bold text-foreground">
                      {formatCurrency(service.price)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
