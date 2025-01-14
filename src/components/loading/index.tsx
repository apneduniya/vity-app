import Image from "next/image";
import darkLogoImg from "@/assets/logo/dark-logo.png";
import lightLogoImg from "@/assets/logo/light-logo.png";
import { useTheme } from "next-themes";


export default function Loading() {
    const {resolvedTheme} = useTheme();

    return (
        <>
            <div className="flex min-h-screen flex-col items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-8">
                    <Image src={resolvedTheme === "dark" ? lightLogoImg : darkLogoImg} alt="Loading logo" width={64} height={64} className="animate-pulse" />

                    <div className="flex flex-col items-center gap-2">
                        <div className="h-1 w-48 overflow-hidden rounded-full bg-muted">
                            <div className="h-full w-1/3 animate-[loading_1s_ease-in-out_infinite] rounded-full bg-foreground"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


