"use client"

import { SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface SearchInputProps {
    defaultValue: string;
    handleSearch: (search: string) => void;
}

const TYPING_TIMEOUT = 500;

export default function SearchInput({ defaultValue, handleSearch }: SearchInputProps) {
    const [searchTerm, setSearchTerm] = useState(defaultValue);
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setTypingTimeout(setTimeout(() => {
            handleSearch(value);
        }, TYPING_TIMEOUT));
    };

    useEffect(() => {
        return () => {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
        };
    }, [typingTimeout]);

    return (
        <>
            <div className="border-[.5px] border-gray-700 max-w-[420px] py-3 px-5 rounded-xl">
                <label className="flex items-center p-0">
                    <span className="sr-only">Search</span>
                    <SearchIcon className="size-4" color="gray" />
                    <input
                        type="search"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleInputChange}
                        className="size-full ml-2 border-none bg-transparent focus:outline-none"
                    />
                </label>
            </div>
        </>
    );
}