"use client";

import { motion } from "framer-motion";
import { Star, Mail, Phone, BadgeCheck, BadgeX } from "lucide-react";
import { barbers } from "@/lib/data";

export default function BarberosPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {barbers.map((barber, i) => (
          <motion.div
            key={barber.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="group rounded-xl border border-border/60 bg-card/60 p-5 backdrop-blur-md transition-colors hover:bg-card/80"
          >
            <div className="flex items-start gap-4">
              <div className="relative">
                <img
                  src={barber.photo}
                  alt={barber.name}
                  className="h-16 w-16 rounded-xl object-cover ring-1 ring-border/60"
                />
                <div
                  className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background ${
                    barber.active ? "bg-emerald-500" : "bg-muted-foreground"
                  }`}
                >
                  {barber.active ? (
                    <BadgeCheck className="h-3 w-3 text-white" />
                  ) : (
                    <BadgeX className="h-3 w-3 text-white" />
                  )}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">
                    {barber.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium text-foreground">
                      {barber.rating}
                    </span>
                  </div>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {barber.specialty}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted/40 px-2 py-0.5 text-[10px] text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    {barber.email}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted/40 px-2 py-0.5 text-[10px] text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    {barber.phone}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                  barber.active
                    ? "bg-emerald-400/10 text-emerald-400"
                    : "bg-muted/40 text-muted-foreground"
                }`}
              >
                {barber.active ? "Activo" : "Inactivo"}
              </span>
              <span className="text-xs text-muted-foreground">
                ID: {barber.id}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
