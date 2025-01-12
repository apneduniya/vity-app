'use client'

import { navbarContents } from "@/assets/data/navbarContents";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


/**
 * This page works only is to redirect to the default dashboard page
 * @returns 
 */
export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        router.push(navbarContents.defaultDashboardLink);
    }, [router]);

    return (
        <></>
    );
}

