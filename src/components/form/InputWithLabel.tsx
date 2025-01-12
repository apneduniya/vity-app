"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyIcon } from "lucide-react"
import { HTMLInputTypeAttribute } from "react"
import { toast } from "sonner"


interface DisabledInputWithCopyProps {
    label: string
    type?: HTMLInputTypeAttribute | undefined
    placeholder: string | undefined
    textToCopy?: string | undefined
}

export function DisabledInputWithCopy({ label, type, placeholder, textToCopy }: DisabledInputWithCopyProps) {
    const copyToClipboard = () => {
        const text = textToCopy || placeholder;
        if (text) {
            navigator.clipboard.writeText(text);
            toast.success("Copied to clipboard");
        } else {
            toast.error("Nothing to copy");
        }
    }

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor={label} className="cursor-text">{label}</Label>
            <div className="flex gap-2 items-center">
                <Input type={type || "text"} id={label} placeholder={placeholder} readOnly disabled />
                <CopyIcon className="h-10 w-9 text-white cursor-pointer hover:bg-gray-50 hover:bg-opacity-10 px-2 rounded-md" onClick={copyToClipboard} />
            </div>
        </div>
    )
}
