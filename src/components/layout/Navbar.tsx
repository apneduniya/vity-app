"use client"

import { navbarContents } from "@/assets/data/navbarContents";
import Image from "next/image";
import Link from "next/link";
// import { LoginButton } from "../auth/LoginButton";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useLogin } from "@privy-io/react-auth";


export default function Navbar() {
    // All list of links and not-found pages have non-sticky (fixed) navbar
    const nonStickyNavbarPages = ['/'];

    // Exceptional routes that have sticky
    const stickyNavbarPages = ['/agents/new'];

    const pathname = usePathname();
    const navLinks = navbarContents.links.map(link => link.href);
    const isSticky = (navLinks.includes(pathname) && !nonStickyNavbarPages.includes(pathname)) || stickyNavbarPages.includes(pathname);

    const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
    const router = useRouter();
    let { login } = useLogin({
        onComplete: (
            // user,
            // isNewUser,
            // wasAlreadyAuthenticated,
            // loginMethod,
            // loginAccount,
        ) => {
            router.push('/home');
        },
    });

    if (isMaintenanceMode) {
        login = () => {
            window.location.href = 'https://x.com/neur_sh';
        };
    }

    return (
        <>
            <nav className={cn("bg-background py-6 px-8 flex justify-between top-0 left-0 w-full z-99999 border-b-[.5px] border-gray-600", isSticky ? "sticky" : "fixed px-8")}>
                <div className="flex gap-4 items-center">
                    <Image src={navbarContents.brand.logo.light} alt="vity logo" className="h-8 w-10" />
                    <ul>
                        {navbarContents.links.map((link, index) => (
                            <li key={index} className="inline-block mx-4 hover:underline">
                                <Link href={link.href}>
                                    <span className="text-gray-300 text-sm">{link.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <Button
                    variant="outline"
                    className="h-9 rounded-lg px-4 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                    onClick={login}
                >
                    Login
                </Button>
            </nav>
        </>
    )
}



