"use client";

import { useEffect, useState } from "react";
import ToolApp from "@/components/cards/app";
import Loading from "@/components/loading";
import { toast } from "sonner";
import { ApiEndpoint } from "@/services/apiEndpoint";
import { App } from "@/types/tools";
import { makeServerApiRequest } from "@/services/makeApiRequest";

interface SearchAppDisplayProps {
    query: string;
}

export default function SearchAppDisplay(props: SearchAppDisplayProps) {
    const [apps, setApps] = useState<App[]>([]);
    const [loading, setLoading] = useState(true);
    const query = props?.query || '';

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await makeServerApiRequest('POST', ApiEndpoint.SearchApps, { query })
                setApps(response.data);
            } catch (err) {
                toast.error('An error occurred while searching for the apps.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="w-full grid justify-items-center gap-8 xl:gap-8 2xl:gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {apps.map((app: App) => (
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
