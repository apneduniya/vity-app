import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/common/theme-provider";
import Navbar from "@/components/layout/Navbar";
import WalletMultiButtonDynamic from "@/components/wallet/WalletMultiButtonDynamic";
import { constructMetaData } from "@/lib/metadata";


const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata = constructMetaData();


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <WalletMultiButtonDynamic>
                        <Navbar />
                        {children}
                    </WalletMultiButtonDynamic>
                </ThemeProvider>
            </body>
        </html>
    );
}
