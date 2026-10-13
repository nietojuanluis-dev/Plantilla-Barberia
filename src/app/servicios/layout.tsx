import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
