import OutlineButton from "@/components/button/Outline";
import { constructMetaData } from "@/lib/metadata";
import { ZapIcon } from "lucide-react";
import Link from "next/link";
import { AgentsComponent } from "@/components/page/agents";


export const metadata = constructMetaData({
    title: "Agents | Vity",
    description: "This is the Agents page for Vity",
});


export default function Agents() {

    return (
        <>
            <div className="pt-10 pb-8 px-8 flex w-full justify-between items-end border-b-[.5px] border-gray-600">
                <div>
                    <h1 className="font-extrabold text-3xl flex items-center">
                        <ZapIcon className="w-8 h-8 inline-block mr-2" />
                        Agents
                    </h1>
                    <p className="text-gray-400 mt-2 text-xl">
                        Discover amazing AI agents made by the community!
                    </p>
                </div>
                <Link href="/agents/new">
                    <OutlineButton text="Create new agent" />
                </Link>
            </div>
            <AgentsComponent />
        </>
    );
}

