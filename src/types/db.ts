import { User as _PrismaUser } from '@prisma/client';
import type { Wallet as _PrismaWallet } from '@prisma/client';
import { User as _PrivyUser } from '@privy-io/react-auth';

export type EmbeddedWallet = Pick<
  _PrismaWallet,
  'id' | 'ownerId' | 'name' | 'publicKey'
>;


export type PrivyUser = _PrivyUser;

export type PrismaUser = _PrismaUser & {
  wallets: EmbeddedWallet[];
};

export type VityUser = Pick<
  PrismaUser,
  'id' | 'privyId' | 'createdAt' | 'updatedAt' | 'apiKey' | 'wallets'
> & {
  privyUser: PrivyUser;
};
