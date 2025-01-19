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
import { VisuallyHidden } from "@radix-ui/react-visually-hidden" // Import VisuallyHidden


interface MobileNavDialogProps {
    setOpen: (open: boolean) => void;
}


export default function MobileNavDialog(props: MobileNavDialogProps) {
    const { authenticated } = useUser();
    const { login } = useLogin();

    return (
        <>
            <DrawerContent>
                <VisuallyHidden>
                    <DrawerTitle>Navigation Drawer</DrawerTitle>
                </VisuallyHidden>
                <div className="w-full flex justify-center items-center p-4">
                    {
                        !authenticated ? (
                            <Button
                                variant="outline"
                                className="h-9 rounded-lg px-4 text-sm transition-colors hover:bg-primary hover:text-primary-foreground w-full"
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
                        <li key={index} onClick={() => props.setOpen(false)}>
                            <Link href={link.href} target={link.href.startsWith('http') ? '_blank' : ''}>
                                <span className="text-white text-base">{link.name}</span>
                            </Link>
                        </li>
                    ))}
                    <br />
                    {authenticated && navbarContents.dashboardLinks.map((group, index) => (
                        <li key={index} onClick={() => props.setOpen(false)}>
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


