import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { categoryColors } from "@/helpers/category";


interface CategoryBadgeProps {
    category: string;
    className?: string;
}


export function CategoryBadge({ category, className }: CategoryBadgeProps) {
    return (
        <Badge
            className={cn(
                `${categoryColors[category]} rounded-lg bg-opacity-10 capitalize`,
                className
            )}
        >
            {category}
        </Badge>
    );
}

