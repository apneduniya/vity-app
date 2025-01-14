"use client"

import { SearchIcon } from "lucide-react";

interface SearchInputProps {
    defaultValue: string;
    handleSearch: (search: string) => void;
}

export default function SearchInput({ defaultValue, handleSearch }: SearchInputProps) {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleSearch(value);
    };

    return (
        <>
            <div className="border-[.5px] border-gray-700 max-w-[420px] py-3 px-5 rounded-xl">
                <label className="flex items-center p-0">
                    <span className="sr-only">Search</span>
                    <SearchIcon className="size-4" color="gray" />
                    <input
                        type="search"
                        placeholder="Search"
                        value={defaultValue}
                        onChange={handleInputChange}
                        className="size-full ml-2 border-none bg-transparent focus:outline-none"
                    />
                </label>
            </div>
        </>
    );
}