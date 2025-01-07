'use client'

import { useUser } from "@/hooks/use-user";
import { useEffect } from "react";


export default function Home() {
    const { user, isLoading } = useUser();

    useEffect(() => {
        console.log('home page:', user);
    }, [user]);

    return (
        <>
            <main className="flex items-center justify-center">
                <h1>Home</h1>
            </main>
        </>
    );
}
