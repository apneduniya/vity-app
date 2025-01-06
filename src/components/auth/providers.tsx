'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
import { useTheme } from 'next-themes';
import { navbarContents } from "@/assets/data/navbarContents";

const solanaConnectors = toSolanaWalletConnectors({
  shouldAutoConnect: false,
});

export default function AuthProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        appearance: {
          theme: resolvedTheme as 'light' | 'dark',
          logo: resolvedTheme === 'dark' ? navbarContents.brand.logo.light.src : navbarContents.brand.logo.dark.src,
        },
        externalWallets: {
          solana: {
            connectors: solanaConnectors,
          },
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
