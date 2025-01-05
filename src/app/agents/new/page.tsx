import CreateNewAgentForm from "@/components/form/new-agent";
import { constructMetaData } from "@/lib/metadata";
import { ZapIcon } from "lucide-react";
import Link from "next/link";


export const metadata = constructMetaData({
    title: "Create new Agent | Vity",
    description: "This is the Create new Agent page for Vity",
});



export default function CreateNewAgent() {
    return (
        <>
            <div className="my-20 flex flex-col items-center">
                <h1 className="font-extrabold text-3xl flex flex-col items-center">
                    <ZapIcon className="w-8 h-8 inline-block mb-2" />
                    Create an new Agent
                </h1>
                <p className="text-gray-400 mt-3 max-w-[600px] text-center">
                    If you have a
                    <Link href="https://hub.docker.com/" className="underline px-1.5" target="_blank">
                        docker image
                    </Link>
                    of your application, you can easily deploy here with your choice of compute power and share it with the world.
                </p>
                <div className="mt-10">
                    <CreateNewAgentForm />
                </div>
            </div>
        </>
    )
}



