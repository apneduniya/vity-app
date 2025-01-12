import { constructMetaData } from "@/lib/metadata";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/layout/DashboardSidebar";


export const metadata = constructMetaData({
    title: "Dashboard | Vity",
    description: "This is the dashboard for Vity",
});


export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <SidebarProvider className="!min-h-full">
                <DashboardSidebar />
                <main className="!min-h-full">
                    {children}
                </main>
            </SidebarProvider>
        </>
    );
}
