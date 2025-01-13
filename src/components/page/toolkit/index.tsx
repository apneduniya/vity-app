"use client"

import SearchInput from "@/components/form/Search";
import AppDisplay from "./AppDisplay";


export function ToolkitComponent() {

    const handleSearch = (searchText: string) => {
        console.log(searchText);
    }

    return (
        <>
            <div className="pt-8 space-y-8 px-8">
                <div>
                    <SearchInput handleSearch={(searchText) => handleSearch(searchText)} />
                </div>
                <AppDisplay />
            </div>
        </>
    )
}


