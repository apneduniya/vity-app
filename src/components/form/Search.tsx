import React from "react";
import { SearchIcon } from "lucide-react";

export default function SearchInput() {
    return (
        <>
            <div className="border-[.5px] border-gray-700 max-w-[420px] py-3 px-5 rounded-xl">
                <label
                    className="flex items-center p-0"
                >
                    <span className="sr-only">Search</span>

                    <SearchIcon className="size-4" color="gray" />
                    <input
                        type="search"
                        placeholder="Search"
                        className="size-full ml-2 border-none bg-transparent focus:outline-none"
                    />
                </label>
            </div>
        </>
    );
};