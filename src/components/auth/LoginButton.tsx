/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useMemo } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useOkto, OktoContextType } from "okto-sdk-react";


export function LoginButton() {
    const { data: session } = useSession();

    const { logOut } = useOkto() as OktoContextType;

    const handleLogin = async () => {
        if (session) {
            logOut();
            signOut();
        } else {
            signIn();
        }
    };

    return (
        <button
            className={`border border-transparent rounded px-4 py-2 transition-colors ${session
                ? "bg-red-500 hover:bg-red-700 text-white"
                : "bg-blue-500 hover:bg-blue-700 text-white"
                }`}
            onClick={handleLogin}
        >
            Google {session ? "Log Out" : "Log In"}
        </button>
    );
}