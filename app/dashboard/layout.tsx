import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="z-40 bg-background">
      <Header />
      <div className="flex min-h-[calc(90vh-20%)]">
        <Sidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
