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
import { useUser } from "@/hooks/use-user";
import { AccountButton } from "../account/button";


export default function Navbar() {
    // All list of links and not-found pages have non-sticky (fixed) navbar
    const nonStickyNavbarPages = ['/'];

    // Exceptional routes that have sticky
    const stickyNavbarPages = ['/agents/new', '/dashboard'];

    const pathname = usePathname();
    const navLinks = navbarContents.links.map(link => link.href);
    const isSticky = (navLinks.includes(pathname) && !nonStickyNavbarPages.includes(pathname)) || stickyNavbarPages.includes(pathname);

    const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
    const router = useRouter();
    const { user, authenticated } = useUser();
    let { login } = useLogin({
        // Commented the below code because whenever the site reloads, it redirects to the home page (as the navbar is present in all pages)
        // Reason:
        // - The useLogin hook is called in the Navbar component which is present in all pages
        // - The onComplete function is called whenever the hook is called and the user is authenticated
        // - It leads to the redirection to the home page

        // onComplete: (
        //     // user,
        //     // isNewUser,
        //     // wasAlreadyAuthenticated,
        //     // loginMethod,
        //     // loginAccount,
        // ) => {
        //     router.push('/');
        // },
    });

    if (isMaintenanceMode) {
        login = () => {
            window.location.href = navbarContents.social.x;
        };
    }

    return (
        <>
            <nav className={cn("bg-background py-6 px-8 flex justify-between top-0 left-0 w-full z-99999 border-b-[.5px] border-gray-600", isSticky ? "sticky" : "fixed px-8")}>
                <div className="flex gap-4 items-center">
                    <Link href={navbarContents.brand.href}>
                        <Image src={navbarContents.brand.logo.light} alt="vity logo" className="h-8 w-10" />
                    </Link>
                    <ul>
                        {navbarContents.links.map((link, index) => (
                            <li key={index} className="inline-block mx-4 hover:underline">
                                <Link href={link.href} target={link.href.startsWith('http') ? '_blank' : ''}>
                                    <span className="text-gray-300 text-sm">{link.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
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
            </nav>
        </>
    )
}



