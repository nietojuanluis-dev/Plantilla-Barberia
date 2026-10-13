"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, User, Phone, Mail, ChevronDown, ChevronUp } from "lucide-react";
import {
  customers,
  appointments,
  getBarberById,
  getServicesByIds,
  formatCurrency,
} from "@/lib/data";

export default function ClientesPage() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q)
    );
  }, [query]);

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card/60 px-3 py-2 backdrop-blur-md">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar clientes..."
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((customer, i) => {
          const customerAppts = appointments
            .filter((a) => a.customerId === customer.id)
            .sort((a, b) => b.date.localeCompare(a.date));
          const isExpanded = expanded.has(customer.id);
          return (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              className="rounded-xl border border-border/60 bg-card/60 backdrop-blur-md"
            >
              <button
                onClick={() => toggleExpanded(customer.id)}
                className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-accent/20"
              >
                <img
                  src={customer.avatar}
                  alt={customer.name}
                  className="h-12 w-12 rounded-xl object-cover ring-1 ring-border/60"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">
                      {customer.name}
                    </h3>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {customer.email}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {customer.phone}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {customer.totalVisits} visitas
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <User className="h-3 w-3" />
                      Última: {customer.lastVisit}
                    </span>
                  </div>
                </div>
              </button>

              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.25 }}
                  className="border-t border-border/40"
                >
                  <div className="p-4">
                    <p className="mb-3 text-xs text-muted-foreground">
                      Notas: {customer.notes}
                    </p>
                    <p className="mb-2 text-xs font-medium text-foreground">
                      Historial de citas
                    </p>
                    <div className="space-y-2">
                      {customerAppts.length === 0 && (
                        <p className="py-2 text-xs text-muted-foreground">
                          Sin citas registradas
                        </p>
                      )}
                      {customerAppts.slice(0, 8).map((appt) => {
                        const barber = getBarberById(appt.barberId);
                        const svcs = getServicesByIds(appt.serviceIds)
                          .map((s) => s.name)
                          .join(", ");
                        return (
                          <div
                            key={appt.id}
                            className="flex flex-col gap-1 rounded-lg bg-background/60 p-2.5 sm:flex-row sm:items-center sm:justify-between"
                          >
                            <div className="text-xs text-foreground">
                              <span className="font-medium">{appt.date}</span>
                              {" · "}
                              <span className="text-muted-foreground">
                                {appt.time}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {barber?.name} · {svcs}
                            </div>
                            <div className="text-xs font-medium text-foreground">
                              {formatCurrency(appt.totalPrice)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
