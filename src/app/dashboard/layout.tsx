import { constructMetaData } from "@/lib/metadata";


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
            <div>
                {children}
            </div>
        </>
    );
}
