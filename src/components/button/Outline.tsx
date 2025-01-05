import { cn } from "@/lib/utils";


interface OutlineButtonProps {
    text: string;
    onClick?: () => void;
    className?: string | undefined;
}


export default function OutlineButton({ text, onClick, className }: OutlineButtonProps) {
    return (
        <button
            onClick={onClick}
            className={cn("border border-white text-white py-2 px-7 rounded-xl focus:outline-none", className)}
        >
            {text}
        </button>
    );
}



