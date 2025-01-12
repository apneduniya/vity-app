import { cn } from "@/lib/utils";


interface HeadingProps {
    children?: React.ReactNode;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
}

const headingSizes = {
    1: "text-3xl",
    2: "text-2xl",
    3: "text-xl",
    4: "text-lg",
    5: "text-base",
    6: "text-sm",
};

/**
 * Heading component with different sizes
 * 
 * @param children
 * @param level 
 * @param className 
 * @returns 
 */
export function Heading({ children, level = 1, className }: HeadingProps) {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    const sizeClass = headingSizes[level];
    return <Tag className={cn(sizeClass, "font-bold tracking-tight", className)}>{children}</Tag>;
}

interface DescriptionProps {
    children?: React.ReactNode;
    className?: string;
}

/**
 * Paragraph with gray color
 * 
 * @param children
 * @param className 
 * @returns 
 */
export function Description({ children, className }: DescriptionProps) {
    return <p className={cn("text-base text-gray-400", className)}>{children}</p>;
}

interface TextProps {
    children?: React.ReactNode;
    className?: string;
}

/**
 * Normal paragraph
 * 
 * @param children
 * @param className 
 * @returns 
 */
export function Text({ children, className }: TextProps) {
    return <p className={cn("text-base", className)}>{children}</p>;
}


