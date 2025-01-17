"use client"

import { navbarContents } from "@/assets/data/navbarContents";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import MobileNavDialog from "./MobileNavDialog";
import { cn } from "@/lib/utils";
import { Drawer, DrawerTrigger } from "../ui/drawer";
import { MenuIcon } from "lucide-react";
import { useState } from "react";


interface MobileNavbarProps {
    isSticky: boolean;
}


export default function MobileNavbar(props: MobileNavbarProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <nav className={cn("bg-background py-6 px-8 flex justify-between top-0 left-0 w-full z-99999 border-b-[.5px] border-gray-600", props.isSticky ? "sticky" : "fixed px-8")}>
                <Link href={navbarContents.brand.href}>
                    <Image src={navbarContents.brand.logo.light} alt="vity logo" className="h-8 w-10" />
                </Link>
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerTrigger asChild>
                        <Button variant="outline">
                            <MenuIcon />
                        </Button>
                    </DrawerTrigger>
                    <MobileNavDialog setOpen={setOpen} />
                </Drawer>
            </nav>
        </>
    );
}
