"use client"

import ChatInput from "@/components/form/ChatInput";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PlaygroundNewChat from "./NewChat";
import PlaygroundChat from "./Chat";


export default function PlaygroundComponent() {
    const [prompt, setPrompt] = useState("");
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();


    const handlePrompt = (prompt: string) => {
        const params = new URLSearchParams(searchParams);
        if (prompt && !searchParams.get('c')) {
            params.set('c', prompt);
            // Update the URL with the new prompt
            replace(`${pathname}?${params.toString()}`);
        } else {
            params.delete('c');
        }

        setPrompt(prompt);
    }

    // Get the prompt from the URL
    // If the prompt is present, use it
    useEffect(() => {
        const prompt = searchParams.get('c');
        if (prompt) {
            setPrompt(prompt.toString());
        }
    }, [searchParams]);

    return (
        <>
            <div className="relative h-full w-full max-w-[820px] mx-auto flex flex-col justify-between items-center">
                {
                    prompt ?
                        <PlaygroundChat prompt={prompt} /> :
                        <PlaygroundNewChat />
                }

                <div className="px-5 fixed bottom-5 md:bottom-10 w-full flex justify-center items-center">
                    <ChatInput defaultValue={searchParams.get('c')?.toString() || ""} handlePrompt={(prompt) => handlePrompt(prompt)} />
                </div>
            </div>
        </>
    )
}


