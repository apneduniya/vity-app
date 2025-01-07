import OutlineButton from "@/components/button/Outline";
import { constructMetaData } from "@/lib/metadata";
import { HammerIcon } from "lucide-react";
import Link from "next/link";
import { ToolkitComponent } from "@/components/page/toolkit";


export const metadata = constructMetaData({
    title: "Toolkit | Vity",
    description: "This is the Toolkit page for Vity",
});


export default function Toolkit() {

    return (
        <>
            <div className="pt-10 pb-8 px-8 flex w-full justify-between items-end border-b-[.5px] border-gray-600">
                <div>
                    <h1 className="font-extrabold text-3xl flex items-center">
                        <HammerIcon className="w-8 h-8 inline-block mr-2" />
                        Toolkit
                    </h1>
                    <p className="text-gray-400 mt-2 text-xl">
                        Vity Toolkit is a powerful tool library of web2 and web3 apps for LLMs & AI agents (also known as function calling).
                    </p>
                </div>
                <Link href="https://t.me/vitytoolkit/2">
                    <OutlineButton text="Request new tool" />
                </Link>
            </div>
            <ToolkitComponent />
        </>
    );
}

