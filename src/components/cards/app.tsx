import { shortenTextType2Function } from "@/utils/shortenText";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { CategoryBadge } from "../badges/category";


interface ToolAppProps {
    logoUrl: string;
    name: string;
    description: string;
    docsLink: string;
    category: string;
}

export default function ToolApp(props: ToolAppProps) {
    return (
        <>
            <Link href={props.docsLink || ""} target="_blank">
                <Card className="w-[350px] bg-transparent">
                    <CardHeader className="flex flex-row justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={props.logoUrl} />
                                <AvatarFallback className="rounded-lg bg-foreground">
                                    {props.name.substring(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-xl">{props.name}</CardTitle>
                        </div>
                        <CategoryBadge category={props.category} />
                    </CardHeader>
                    <CardContent className="text-sm text-gray-400">
                        <p>{shortenTextType2Function(props.description, 69)}</p>
                    </CardContent>
                </Card>
            </Link>
        </>
    )
}


