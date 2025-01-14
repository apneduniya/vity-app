"use client"

import SearchInput from "@/components/form/Search";


export function AgentsComponent() {

    const handleSearch = (searchText: string) => {
        console.log(searchText);
    }

    return (
        <>
            <div className="pt-8 px-8">
                <SearchInput defaultValue="" handleSearch={(searchText) => handleSearch(searchText)} />
            </div>
        </>
    )
}


