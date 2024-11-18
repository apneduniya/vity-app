// src/components/WalletMultiButtonDynamic.tsx
"use client";

import dynamic from "next/dynamic";

const WalletMultiButtonDynamic = dynamic(
    async () => await import("@/context/WalletConnectProvider"),
    { ssr: false } // Disable server-side rendering
);

export default WalletMultiButtonDynamic;
