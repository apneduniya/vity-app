import { SendIcon } from "lucide-react";
import { Button } from "../ui/button";


export default function ChatInput() {
    return (
        <>
            <div className="w-full max-w-[780px] h-[60px] flex items-center px-8 border border-gray-500 rounded-3xl">
                <input className="w-full bg-transparent focus:outline-none focus:shadow-none" type="text" placeholder="Ask a question..." autoFocus />
                <div className="cursor-pointer">
                    <SendIcon size="20" />
                </div>
            </div>
        </>
    )
}


