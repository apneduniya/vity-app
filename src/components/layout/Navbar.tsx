import { navbarContents } from "@/assets/data/navbarContents";
import Image from "next/image";
import Link from "next/link";
// import { LoginButton } from "../auth/LoginButton";
import ConnectWallet from "../wallet/ConnectWallet";


export default function Navbar() {
    return (
        <>
            <nav className="py-6 flex justify-between sticky top-0 left-0 w-full z-99999">
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
                <ConnectWallet />
            </nav>
        </>
    )
}



