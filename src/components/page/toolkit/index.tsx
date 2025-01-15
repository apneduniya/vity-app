"use client"

import SearchInput from "@/components/form/Search";
import AppDisplay from "./AppDisplay";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import SearchAppDisplay from "./SearchAppDisplay";


export function ToolkitComponent() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (searchText: string) => {
        const params = new URLSearchParams(searchParams);
        if (searchText) {
            params.set('query', searchText);
        } else {
            params.delete('query');
        }

        // Update the URL with the new search query
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <>
            <div className="py-8 space-y-8 px-8">
                <div>
                    <SearchInput defaultValue={searchParams.get('query')?.toString() || ""} handleSearch={(searchText) => handleSearch(searchText)} />
                </div>
                {
                    searchParams.get('query') ? <SearchAppDisplay query={searchParams.get('query')?.toString() || ""} /> : <AppDisplay />
                }
            </div>
        </>
    )
}


