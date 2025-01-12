import { Description, Heading } from "@/components/common/text";
import APIKeyInformation from "@/components/page/dashboard/profile/APIKeyInformation";
import BasicInformation from "@/components/page/dashboard/profile/BasicInformation";
import { Separator } from "@/components/ui/separator";
import { constructMetaData } from "@/lib/metadata";


export const metadata = constructMetaData({
    title: "Profile | Vity",
    description: "This is the Profile for Vity",
});


export default function Profile() {
    return (
        <>
            <div className="space-y-6">
                <div>
                    <Heading>
                        Profile
                    </Heading>
                    <Description>
                        Manage your profile settings
                    </Description>
                </div>
                <Separator />
                <BasicInformation />
                <Separator />
                <APIKeyInformation />
            </div>
        </>
    );
}

