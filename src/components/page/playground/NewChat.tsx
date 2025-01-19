import { promptSuggestions } from "@/assets/data/promptSuggestions";
import PromptSuggestionBadge from "@/components/badges/prompt-suggestion";
import { Heading } from "@/components/common/text";


export default function PlaygroundNewChat() {
    return (
        <>
            <div className="h-[calc(100dvh-var(--navbar-height))] w-full flex justify-center items-center">
                <div className="flex flex-col items-center space-y-8">
                    <Heading level={1}>
                        What do you want me to do?
                    </Heading>
                    <div className="flex flex-wrap gap-4 justify-center max-w-[700px]">
                        {promptSuggestions.map((prompt, index) => (
                            <PromptSuggestionBadge key={index} text={prompt.title} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}


