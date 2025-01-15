"use client"

import {
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { navbarContents } from "@/assets/data/navbarContents"
import Link from "next/link"
import { useUser } from "@/hooks/use-user"
import { useLogin } from "@privy-io/react-auth"
import { Button } from "../ui/button"
import { AccountButton } from "../account/button"


export default function MobileNavDialog() {
    const { authenticated } = useUser();
    const { login } = useLogin();

    return (
        <>
            <DrawerContent>
                <div className="flex justify-between items-center p-4">
                    {
                        !authenticated ? (
                            <Button
                                variant="outline"
                                className="h-9 rounded-lg px-4 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                                onClick={login}
                            >
                                Login
                            </Button>
                        ) : (
                            <AccountButton />
                        )
                    }
                </div>
                <ul className="p-4 pb-5">
                    {navbarContents.links.map((link, index) => (
                        <li key={index}>
                            <Link href={link.href} target={link.href.startsWith('http') ? '_blank' : ''}>
                                <span className="text-white text-base">{link.name}</span>
                            </Link>
                        </li>
                    ))}
                    <br />
                    {navbarContents.dashboardLinks.map((group, index) => (
                        <li key={index}>
                            <span className="font-bold text-lg">{group.group}</span>
                            <ul>
                                {group.links.map((link, index) => (
                                    <li key={index}>
                                        <Link href={link.href}>
                                            <span className="text-gray-400 text-base">{link.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <br />
                        </li>
                    ))}
                </ul>
            </DrawerContent>
        </>
    )
}


