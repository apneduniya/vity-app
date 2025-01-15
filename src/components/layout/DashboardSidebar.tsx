import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { navbarContents } from "@/assets/data/navbarContents"
import Link from "next/link"


export default function DashboardSidebar() {
    return (
        <>
            <Sidebar className="!sticky h-[calc(100dvh-var(--navbar-height))]">
                <SidebarContent>
                    {
                        navbarContents.dashboardLinks.map((group, index) => (
                            <SidebarGroup key={index}>
                                <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {
                                            group.links.map((link, index) => (
                                                <Link href={link.href} key={index}>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton>
                                                            {link.icon && <link.icon />}
                                                            {link.name}
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                </Link>
                                            ))
                                        }
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        ))
                    }
                </SidebarContent>
            </Sidebar>
        </>
    )
}


