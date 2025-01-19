"use client"

import { SendIcon } from "lucide-react";
import { useEffect, useState } from "react";


interface ChatInputProps {
    defaultValue: string;
    handlePrompt: (prompt: string) => void;
}

export default function ChatInput(props: ChatInputProps) {
    const [prompt, setPrompt] = useState(props.defaultValue);

    const handleInput = () => {
        const filteredPrompt = prompt.trim();
        props.handlePrompt(filteredPrompt);

        setPrompt("");
    }

    useEffect(() => {
        handleInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="w-full max-w-[820px] h-[60px] flex items-center px-8 border border-gray-500 rounded-3xl">
                <input 
                    className="w-full bg-transparent focus:outline-none focus:shadow-none" 
                    type="text" 
                    placeholder="Ask a question..." 
                    autoFocus 
                    value={prompt} 
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleInput();
                        }
                    }}
                />
                <div className="cursor-pointer" onClick={handleInput}>
                    <SendIcon size="20" />
                </div>
            </div>
        </>
    )
}


