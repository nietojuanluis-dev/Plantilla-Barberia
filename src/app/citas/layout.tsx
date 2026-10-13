import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function CitasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
