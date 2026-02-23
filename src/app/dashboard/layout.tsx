import { DashboardSidebar } from "@/components/organisms/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen text-white">
      <DashboardSidebar />
      <main className="pl-64">
        <div className="container mx-auto p-8 max-w-6xl">
            {children}
        </div>
      </main>
    </div>
  );
}
