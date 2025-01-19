import { ChatBubble, ChatBubbleMessage } from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Chat } from "@/types/playground";


interface PlaygroundChatProps {
    prompt: string;
    // chat?: Chat;
}

export default function PlaygroundChat(props: PlaygroundChatProps) {

    return (
        <>
            <div className="w-full flex justify-center items-center h-full">
                <ChatMessageList>
                    <ChatBubble variant='sent'>
                        <ChatBubbleMessage variant='sent'>
                            Hello bro!
                        </ChatBubbleMessage>
                    </ChatBubble>
                    <ChatBubble variant='sent'>
                        <ChatBubbleMessage variant='sent'>
                            {props.prompt}
                        </ChatBubbleMessage>
                    </ChatBubble>
                    <ChatBubble variant='received'>
                        <ChatBubbleMessage isLoading />
                    </ChatBubble>
                </ChatMessageList>
            </div>
        </>
    )
}


