

interface PromptSuggestionBadgeProps {
    text: string;
}


export default function PromptSuggestionBadge(props: PromptSuggestionBadgeProps) {
    return (
        <>
            <div className="w-fit py-2.5 px-5 rounded-2xl border border-gray-700 flex items-center justify-center cursor-pointer select-none">
                <span className="text-gray-400 text-sm">{props.text}</span>
            </div>
        </>
    )
}


