import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface CustomBadgeProps {
    className?: string;
}


export function NewBadge(props: CustomBadgeProps) {
    return (
        <>
            <Badge className={cn("rounded-lg bg-green-400 text-green-600 bg-opacity-10", props.className)}>
                New
            </Badge>
        </>
    )
}


