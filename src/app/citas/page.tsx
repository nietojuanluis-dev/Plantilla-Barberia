"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Circle,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import {
  appointments,
  barbers,
  getBarberById,
  getCustomerById,
  formatCurrency,
} from "@/lib/data";
import type { AppointmentStatus } from "@/lib/data";

function getMonthMatrix(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startWeekday = firstDay.getDay(); // 0=Sun
  const daysInMonth = lastDay.getDate();
  const weeks: number[][] = [];
  let currentWeek: number[] = [];

  for (let i = 0; i < (startWeekday === 0 ? 6 : startWeekday - 1); i++) {
    currentWeek.push(0);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    currentWeek.push(d);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(0);
    weeks.push(currentWeek);
  }

  return weeks;
}

function statusConfig(status: AppointmentStatus) {
  switch (status) {
    case "completada":
      return {
        icon: CheckCircle2,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        label: "Completada",
      };
    case "cancelada":
      return {
        icon: XCircle,
        color: "text-red-400",
        bg: "bg-red-400/10",
        label: "Cancelada",
      };
    case "en-progreso":
      return {
        icon: Clock,
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        label: "En progreso",
      };
    case "confirmada":
      return {
        icon: CheckCircle2,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        label: "Confirmada",
      };
    default:
      return {
        icon: Circle,
        color: "text-muted-foreground",
        bg: "bg-muted/40",
        label: "Pendiente",
      };
  }
}

export default function CitasPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("es-CO", {
    month: "long",
    year: "numeric",
  });

  const weeks = useMemo(() => getMonthMatrix(year, month), [year, month]);

  const selectedBarberId = "all";

  const filteredAppointments = useMemo(() => {
    return appointments.filter((a) => {
      const d = new Date(a.date);
      return d.getFullYear() === year && d.getMonth() === month;
    });
  }, [year, month]);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border/60 bg-card/60 text-foreground hover:bg-accent/50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="min-w-[140px] text-center text-sm font-semibold capitalize text-foreground">
            {monthName}
          </span>
          <button
            onClick={nextMonth}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border/60 bg-card/60 text-foreground hover:bg-accent/50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {barbers.map((b) => (
            <span
              key={b.id}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-2.5 py-1 text-xs text-foreground"
            >
              <span
                className={`h-2 w-2 rounded-full ${b.active ? "bg-emerald-400" : "bg-muted-foreground"}`}
              />
              {b.name.split(" ")[0]}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-card/60 p-5 backdrop-blur-md">
        <div className="mb-2 grid grid-cols-7 gap-1">
          {weekDays.map((d) => (
            <div
              key={d}
              className="py-2 text-center text-xs font-medium uppercase text-muted-foreground"
            >
              {d}
            </div>
          ))}
        </div>
        <div className="space-y-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7 gap-1">
              {week.map((day, di) => {
                if (day === 0)
                  return (
                    <div
                      key={`${wi}-${di}`}
                      className="min-h-[80px] rounded-lg bg-muted/20"
                    />
                  );
                const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const dayAppts = filteredAppointments.filter(
                  (a) => a.date === dateStr
                );
                const isToday = dateStr === new Date().toISOString().split("T")[0];
                return (
                  <motion.div
                    key={`${wi}-${di}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (wi * 7 + di) * 0.01 }}
                    className={`min-h-[80px] rounded-lg border p-1.5 transition-colors ${
                      isToday
                        ? "border-primary/40 bg-primary/5"
                        : "border-border/40 bg-card/40 hover:bg-accent/30"
                    }`}
                  >
                    <span
                      className={`text-xs font-semibold ${
                        isToday ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {day}
                    </span>
                    <div className="mt-1 space-y-1">
                      {dayAppts.slice(0, 3).map((appt) => {
                        const customer = getCustomerById(appt.customerId);
                        return (
                          <div
                            key={appt.id}
                            className="truncate rounded bg-background/60 px-1.5 py-0.5 text-[10px] text-foreground"
                          >
                            {appt.time} {customer?.name?.split(" ")[0]}
                          </div>
                        );
                      })}
                      {dayAppts.length > 3 && (
                        <div className="text-[10px] text-muted-foreground">
                          +{dayAppts.length - 3} más
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-card/60 p-5 backdrop-blur-md">
        <h2 className="mb-4 text-base font-semibold text-foreground">
          Próximas citas
        </h2>
        <div className="space-y-2">
          {appointments
            .filter((a) => {
              const now = new Date().toISOString().split("T")[0];
              return a.date >= now;
            })
            .sort((a, b) => {
              const da = a.date + "T" + a.time;
              const db = b.date + "T" + b.time;
              return da.localeCompare(db);
            })
            .slice(0, 10)
            .map((appt) => {
              const customer = getCustomerById(appt.customerId);
              const barber = getBarberById(appt.barberId);
              const cfg = statusConfig(appt.status);
              const StatusIcon = cfg.icon;
              return (
                <div
                  key={appt.id}
                  className="flex flex-col gap-2 rounded-lg border border-border/40 p-3 transition-colors hover:bg-accent/30 sm:flex-row sm:items-center"
                >
                  <div className="flex items-center gap-3 sm:w-[240px]">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${cfg.bg}`}
                    >
                      <StatusIcon className={`h-4 w-4 ${cfg.color}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {customer?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {appt.date} · {appt.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-center gap-4 sm:justify-center">
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Barbero:
                      </span>{" "}
                      {barber?.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Duración:
                      </span>{" "}
                      {appt.totalDuration} min
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:justify-end">
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {cfg.label}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {formatCurrency(appt.totalPrice)}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
