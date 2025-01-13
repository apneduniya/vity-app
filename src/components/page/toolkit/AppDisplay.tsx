import { useToolAppData } from "@/hooks/use-data";
import ToolApp from "@/components/cards/app";

export default function AppDisplay() {
    const { data, error, isLoading } = useToolAppData('/apps');

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading apps.</div>;
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

