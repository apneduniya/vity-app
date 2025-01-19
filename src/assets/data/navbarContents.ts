import lightLogo from "../logo/light-logo.png";
import darkLogo from "../logo/dark-logo.png";
import { BarChartIcon, CableIcon, ToyBrickIcon, UserIcon, WalletIcon } from "lucide-react";


export const navbarContents = {
    "brand": {
        "logo": {
            "light": lightLogo,
            "dark": darkLogo
        },
        "href": "/",
        "title": "Vity"
    },
    "social": {
        "x": "https://x.com/vity_toolkit",
        "docs": "https://vity-toolkit.gitbook.io/"
    },
    "links": [
        // {
        //     "name": "Home",
        //     "href": "/"
        // },
        {
            "name": "Toolkit",
            "href": "/toolkit"
        },
        {
            "name": "Playground",
            "href": "/playground"
        },
        // {
        //     "name": "Agents",
        //     "href": "/agents"
        // },
        {
            "name": "Support",
            "href": "https://t.me/vitytoolkit"
        }
    ],
    "defaultDashboardLink": "/dashboard/analytics",
    "dashboardLinks": [
        {
            "group": "Overview",
            "links": [
                {
                    "name": "Analytics",
                    "href": "/dashboard/analytics",
                    "icon": BarChartIcon
                }
            ]
        },
        {
            "group": "Toolkit",
            "links": [
                {
                    "name": "Integrations",
                    "href": "/dashboard/integrations",
                    "icon": ToyBrickIcon
                },
                {
                    "name": "Connections",
                    "href": "/dashboard/connections",
                    "icon": CableIcon
                }
            ]
        },
        {
            "group": "Account",
            "links": [
                {
                    "name": "Profile",
                    "href": "/dashboard/profile",
                    "icon": UserIcon
                },
                {
                    "name": "Embedded Wallet",
                    "href": "/dashboard/embedded-wallet",
                    "icon": WalletIcon
                }
            ]
        }
    ],
}


