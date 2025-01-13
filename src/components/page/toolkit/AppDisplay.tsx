import { useToolAppData } from "@/hooks/use-data";
import ToolApp from "@/components/cards/app";
import Loading from "@/components/loading";
import { toast } from "sonner";
import { ApiEndpoint } from "@/services/apiEndpoint";


export default function AppDisplay() {
    const { data, error, isLoading } = useToolAppData(ApiEndpoint.GetManyApps);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        toast.error('An error occurred while fetching the latest data');
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data?.data?.map((app: any) => (
                <ToolApp
                    key={app.id}
                    logoUrl={app.logoUrl}
                    name={app.name}
                    description={app.description}
                />
            ))}
        </div>
    );
}

