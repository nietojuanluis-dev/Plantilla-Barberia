"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  appointments,
  barbers,
  formatCurrency,
  getBarberById,
  getCustomerById,
} from "@/lib/data";

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export default function DashboardPage() {
  const today = getTodayDate();

  const stats = useMemo(() => {
    const todayAppts = appointments.filter((a) => a.date === today);
    const completedToday = todayAppts.filter((a) => a.status === "completada");
    const revenueToday = completedToday.reduce((s, a) => s + a.totalPrice, 0);
    const activeBarbers = barbers.filter((b) => b.active).length;
    const totalWeekRevenue = appointments
      .filter((a) => {
        const d = new Date(a.date);
        const now = new Date();
        const diff =
          (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
        return diff >= -6 && diff <= 0 && a.status === "completada";
      })
      .reduce((s, a) => s + a.totalPrice, 0);

    return {
      todayCount: todayAppts.length,
      completedCount: completedToday.length,
      revenueToday,
      activeBarbers,
      totalWeekRevenue,
    };
  }, [today]);

  const todayAppointments = useMemo(
    () =>
      appointments
        .filter((a) => a.date === today)
        .sort((a, b) => a.time.localeCompare(b.time)),
    [today]
  );

  const statusIcon = (status: string) => {
    switch (status) {
      case "completada":
        return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
      case "cancelada":
        return <XCircle className="h-4 w-4 text-red-400" />;
      case "en-progreso":
        return <Clock className="h-4 w-4 text-amber-400" />;
      case "confirmada":
        return <CheckCircle2 className="h-4 w-4 text-blue-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const weeklyData = useMemo(() => {
    const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
    const values = days.map(() => 0);
    appointments
      .filter((a) => a.status === "completada")
      .forEach((a) => {
        const d = new Date(a.date).getDay();
        const idx = d === 0 ? 6 : d - 1;
        values[idx] += a.totalPrice;
      });
    const max = Math.max(...values, 1);
    return { days, values, max };
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Citas Hoy",
              value: stats.todayCount.toString(),
              sub: `${stats.completedCount} completadas`,
              icon: CalendarCheck,
            },
            {
              label: "Ingresos Hoy",
              value: formatCurrency(stats.revenueToday),
              sub: "Día actual",
              icon: DollarSign,
            },
            {
              label: "Barberos Activos",
              value: stats.activeBarbers.toString(),
              sub: `${barbers.length} total`,
              icon: Users,
            },
            {
              label: "Ingresos Semana",
              value: formatCurrency(stats.totalWeekRevenue),
              sub: "Últimos 7 días",
              icon: TrendingUp,
            },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="rounded-xl border border-border/60 bg-card/60 p-5 backdrop-blur-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {card.value}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {card.sub}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <card.icon className="h-5 w-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="rounded-xl border border-border/60 bg-card/60 p-5 backdrop-blur-md lg:col-span-2"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground">
                Ingresos Semanales
              </h2>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-end gap-3">
              {weeklyData.days.map((day, idx) => {
                const pct = (weeklyData.values[idx] / weeklyData.max) * 100;
                return (
                  <div key={day} className="flex flex-1 flex-col items-center gap-2">
                    <div className="relative w-full">
                      <div className="h-32 w-full overflow-hidden rounded-md bg-muted/40">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${pct}%` }}
                          transition={{ delay: 0.5 + idx * 0.08, duration: 0.6 }}
                          className="absolute bottom-0 w-full rounded-md bg-primary/70"
                        />
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{day}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="rounded-xl border border-border/60 bg-card/60 p-5 backdrop-blur-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground">
                Citas de Hoy
              </h2>
              <CalendarCheck className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {todayAppointments.slice(0, 6).map((appt) => {
                const customer = getCustomerById(appt.customerId);
                const barber = getBarberById(appt.barberId);
                return (
                  <div
                    key={appt.id}
                    className="flex items-center gap-3 rounded-lg border border-border/40 p-3 transition-colors hover:bg-accent/40"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                      {statusIcon(appt.status)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {customer?.name || "Cliente"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {barber?.name || "Barbero"} · {appt.time}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-foreground">
                      {formatCurrency(appt.totalPrice)}
                    </span>
                  </div>
                );
              })}
              {todayAppointments.length === 0 && (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  Sin citas programadas hoy
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
