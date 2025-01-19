import PlaygroundComponent from "@/components/page/playground";
import { constructMetaData } from "@/lib/metadata";


export const metadata = constructMetaData({
    title: "Playground | Vity",
    description: "This is the Playground page for Vity",
});


export default function Playground() {
    return (
        <>
            <PlaygroundComponent />
        </>
    )
}

