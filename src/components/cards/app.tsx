import { shortenTextType2Function } from "@/utils/shortenText";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { NewBadge } from "../badges";


interface ToolAppProps {
    logoUrl: string;
    name: string;
    description: string;
}

export default function ToolApp(props: ToolAppProps) {
    return (
        <>
            <Card className="w-[350px] bg-transparent">
                <CardHeader className="flex flex-row justify-between">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={props.logoUrl} />
                            <AvatarFallback className="rounded-lg bg-foreground">
                                {props.name.substring(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-xl">{props.name}</CardTitle>
                    </div>
                    <NewBadge />
                </CardHeader>
                <CardContent>
                    <p>{shortenTextType2Function(props.description, 69)}</p>
                </CardContent>
            </Card>
        </>
    )
}


