import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/common/theme-provider";
import Navbar from "@/components/layout/Navbar";
import { constructMetaData } from "@/lib/metadata";
import AuthProviders from "@/components/auth/providers";
import { Toaster } from "@/components/ui/sonner"


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
                <AuthProviders>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Navbar />
                        {children}
                        <Toaster />
                    </ThemeProvider>
                </AuthProviders>
            </body>
        </html>
    );
}
