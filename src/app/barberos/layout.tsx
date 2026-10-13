import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function BarberosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
