import ChatInput from "@/components/form/ChatInput";
import NewChat from "@/components/page/playground/NewChat";


export default function Playground() {
    return (
        <>
            <div className="relative h-full w-full">
                <NewChat />

                <div className="px-5 fixed bottom-5 md:bottom-10 w-full flex justify-center items-center">
                    <ChatInput />
                </div>
            </div>
        </>
    )
}

