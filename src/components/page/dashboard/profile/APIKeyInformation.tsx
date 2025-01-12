"use client"

import { Description, Heading } from "@/components/common/text";
import { DisabledInputWithCopy } from "@/components/form/InputWithLabel";
import { useUser } from "@/hooks/use-user";
import { obfuscateText } from "@/utils/obfuscateText";


export default function APIKeyInformation() {
    const { user } = useUser();

    return (
        <>
            <div className="space-y-6">
                <div>
                    <Heading level={3}>API Key</Heading>
                    <Description>It helps you to connect and manage your app with seamless access. Keep it safe!</Description>
                </div>
                <DisabledInputWithCopy label="API Key" type="password" placeholder={obfuscateText(user?.apiKey)} textToCopy={user?.apiKey}/>
            </div>
        </>
    )
}


