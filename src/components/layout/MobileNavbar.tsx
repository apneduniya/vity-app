"use client"

import { navbarContents } from "@/assets/data/navbarContents";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import MobileNavDialog from "./MobileNavDialog";
import { cn } from "@/lib/utils";
import { Drawer, DrawerTrigger } from "../ui/drawer";
import { MenuIcon } from "lucide-react";

export default function MobileNavbar() {

    return (
        <>
            <nav className={cn("bg-background py-6 px-8 flex justify-between top-0 left-0 w-full z-99999 border-b-[.5px] border-gray-600", "fixed px-8")}>
                <Link href={navbarContents.brand.href}>
                    <Image src={navbarContents.brand.logo.light} alt="vity logo" className="h-8 w-10" />
                </Link>
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant="outline">
                            <MenuIcon />
                        </Button>
                    </DrawerTrigger>
                    <MobileNavDialog />
                </Drawer>
            </nav>
        </>
    );
}
