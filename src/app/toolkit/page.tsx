import { constructMetaData } from "@/lib/metadata";
import { HammerIcon } from "lucide-react";
import Link from "next/link";
import { ToolkitComponent } from "@/components/page/toolkit";
import { Button } from "@/components/ui/button";


export const metadata = constructMetaData({
    title: "Toolkit | Vity",
    description: "This is the Toolkit page for Vity",
});


export default function Toolkit() {
    return (
        <>
            <div className="w-full pt-10 pb-8 px-8 gap-7 flex flex-col md:flex-row items-center md:justify-between md:items-end border-b-[.5px] border-gray-600">
                <div>
                    <h1 className="font-extrabold flex items-center text-2xl md:text-3xl">
                        <HammerIcon className="w-8 h-8 inline-block mr-2" />
                        Toolkit
                    </h1>
                    <p className="text-gray-400 mt-2 text-base md:text-lg lg:text-xl">
                        Vity Toolkit is a powerful tool library of web2 and web3 apps for LLMs & AI agents (also known as function calling).
                    </p>
                </div>
                <Link href="https://t.me/vitytoolkit/2" className="w-full md:w-fit">
                    {/* <OutlineButton text="Request new tool" /> */}
                    <Button variant="outline" className="bg-transparent w-full md:w-fit">
                        Request new tool
                    </Button>
                </Link>
            </div>
            <ToolkitComponent />
        </>
    );
}

