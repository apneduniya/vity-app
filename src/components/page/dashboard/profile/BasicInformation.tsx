"use client"

import { Description, Heading } from "@/components/common/text";
import { DisabledInputWithCopy } from "@/components/form/InputWithLabel";
import { useUser } from "@/hooks/use-user";


export default function BasicInformation() {
    const { user } = useUser();

    return (
        <>
            <div className="space-y-6">
                <div>
                    <Heading level={3}>Basic Information</Heading>
                    <Description>Tell us your basic info details</Description>
                </div>
                <DisabledInputWithCopy label="Account ID" placeholder={user?.id}/>
                <DisabledInputWithCopy label="Email ID" placeholder={user?.privyUser.email?.address}/>
            </div>
        </>
    )
}


