'use server';

import { cookies } from 'next/headers';

import { PrivyClient } from '@privy-io/server-auth';
import { z } from 'zod';

import prisma from '@/lib/prisma';
import { generateEncryptedKeyPair } from '@/lib/solana/wallet-generator';
import { PrismaUser } from '@/types/db';
import { actionClient, ActionResponse } from '@/utils/safe-action';
import { generateApiKey, decryptApiKey } from '@/lib/api-key-generator';
import { logger } from '../../logger';

const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
const PRIVY_APP_SECRET = process.env.PRIVY_APP_SECRET;

if (!PRIVY_APP_ID || !PRIVY_APP_SECRET) {
  throw new Error('Lack of necessary environment variables');
}

const PRIVY_SERVER_CLIENT = new PrivyClient(PRIVY_APP_ID, PRIVY_APP_SECRET);

const getOrCreateUser = actionClient
  .schema(z.object({ userId: z.string() }))
  .action<ActionResponse<PrismaUser>>(async ({ parsedInput: { userId } }) => {
    const prismaUser = await prisma.user.findUnique({
      where: { privyId: userId },
      include: {
        wallets: {
          select: {
            id: true,
            ownerId: true,
            name: true,
            publicKey: true,
          },
        },
      },
    });

    if (prismaUser) {
      const decryptedApiKey = await decryptApiKey(prismaUser.apiKey);
      return {
        success: true,
        data: { ...prismaUser, apiKey: decryptedApiKey },
      };
    }

    const apiKey = await generateApiKey();
    const createdUser = await prisma.user.create({ data: { privyId: userId, apiKey } });
    const { publicKey, encryptedPrivateKey } = await generateEncryptedKeyPair();
    const initalWallet = await prisma.wallet.create({
      data: {
        ownerId: createdUser.id,
        name: 'Personal',
        publicKey,
        encryptedPrivateKey,
      },
    });

    return {
      success: true,
      data: {
        ...createdUser,
        apiKey: await decryptApiKey(createdUser.apiKey),
        wallets: [
          {
            id: initalWallet.id,
            ownerId: initalWallet.ownerId,
            name: initalWallet.name,
            publicKey: initalWallet.publicKey,
          },
        ],
      },
    };
  });

export const verifyUser = actionClient.action<
  ActionResponse<{ id: string; publicKey?: string }>
>(async () => {
  const token = (await cookies()).get('privy-token')?.value;

  if (!token) {
    return {
      success: false,
      error: 'No privy token found',
    };
  }

  try {
    const claims = await PRIVY_SERVER_CLIENT.verifyAuthToken(token);
    const user = await prisma.user.findUnique({
      where: { privyId: claims.userId },
      select: {
        id: true,
        wallets: {
          select: {
            publicKey: true,
          },
          take: 1,
        },
      },
    });

    if (!user) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    return {
      success: true,
      data: {
        id: user.id,
        publicKey: user.wallets[0]?.publicKey,
      },
    };
  } catch (_) {
    return {
      success: false,
      error: 'Authentication failed',
    };
  }
});

export const getUserData = actionClient.action<ActionResponse<PrismaUser>>(
  async () => {
    const token = (await cookies()).get('privy-token')?.value;

    if (!token) {
      return {
        success: false,
        error: 'No privy token found',
      };
    }

    try {
      const claims = await PRIVY_SERVER_CLIENT.verifyAuthToken(token);
      const response = await getOrCreateUser({ userId: claims.userId });

      const success = response?.data?.success;
      const user = response?.data?.data;
      const error = response?.data?.error;

      if (!success) {
        return {
          success: false,
          error: error,
        };
      }

      if (!user) {
        return {
          success: false,
          error: 'User data is undefined',
        };
      }

      return {
        success: true,
        data: { ...user },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Authentication failed',
      };
    }
  },
);

/**
 * Validates an API key and returns the associated user with their wallet
 * @param apiKey - The encrypted API key to validate
 * @returns User with wallet data or null if invalid
 */
export async function validateApiKey(apiKey: string) {
  try {
    if (!apiKey) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { apiKey },
      include: {
        wallets: {
          select: {
            id: true,
            encryptedPrivateKey: true,
          },
          take: 1, // Get the first (personal) wallet
        },
      },
    });

    if (!user) {
      logger('Invalid API key provided', null, {
        module: 'server/user',
        level: 'warn',
      });
      return null;
    }

    logger('API key validated successfully for user', user.id, {
      module: 'server/user',
      level: 'info',
    });

    return user;
  } catch (error) {
    logger('Error validating API key', error, {
      module: 'server/user',
      level: 'error',
    });
    return null;
  }
}