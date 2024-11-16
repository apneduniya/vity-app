/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { LoginButton } from "@/components/auth/LoginButton";
import { useOkto, OktoContextType } from "okto-sdk-react";


export default function Login() {
    const { data: session } = useSession();

    const {
        isLoggedIn,
        authenticate,
        authenticateWithUserId,
        logOut,
        getPortfolio,
        transferTokens,
        getWallets,
        createWallet,
        getSupportedNetworks,
        getSupportedTokens,
        getUserDetails,
        orderHistory,
        getNftOrderDetails,
        showWidgetModal,
        getRawTransactionStatus,
        transferTokensWithJobStatus,
        transferNft,
        transferNftWithJobStatus,
        executeRawTransaction,
        executeRawTransactionWithJobStatus,
        setTheme,
        getTheme,
    } = useOkto() as OktoContextType;

    const idToken = useMemo(() => (session ? session.id_token : null), [session]);

    async function handleAuthenticate(): Promise<any> {
        if (!idToken) {
            return { result: false, error: "No google login" };
        }
        return new Promise((resolve) => {
            authenticate(idToken as string, (result: any, error: any) => {
                if (result) {
                    console.log("Authentication successful");
                    resolve({ result: true });
                } else if (error) {
                    console.error("Authentication error:", error);
                    resolve({ result: false, error });
                }
            });
        });
    }

    useEffect(() => {
        if (session?.id_token) {
            handleAuthenticate();
            createWallet()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    return (
        <>
            <main className="flex flex-col gap-10 items-center justify-center">
                <div className="flex flex-col gap-5 items-center">
                    {/* status indicator */}
                    <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm">
                        <div className={`w-3 h-3 rounded-full ${isLoggedIn ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-black text-sm font-medium">
                            Status: {isLoggedIn ? 'Logged In' : 'Not Logged In'}
                        </span>
                    </div>
                </div>

                <LoginButton />
            </main>
        </>
    );
}







