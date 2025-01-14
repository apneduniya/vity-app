import { useToolAppData } from "@/hooks/use-data";
import ToolApp from "@/components/cards/app";
import Loading from "@/components/loading";
import { toast } from "sonner";
import { ApiEndpoint } from "@/services/apiEndpoint";
import { App } from "@/types/tools";


export default function AppDisplay() {
    const { data, error, isLoading } = useToolAppData(ApiEndpoint.GetManyApps);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        toast.error('An error occurred while fetching the latest data');
    }

    return (
        <div className="w-full grid justify-items-center gap-8 xl:gap-8 2xl:gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {data?.data?.map((app: App) => (
            <ToolApp
                key={app.id}
                logoUrl={app.logoUrl}
                name={app.name}
                description={app.description}
                docsLink={app.docsLink}
                category={app.category}
            />
            ))}
        </div>
    );
}

