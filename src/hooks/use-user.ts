'use client';

import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { PrivyInterface, usePrivy } from '@privy-io/react-auth';
import useSWR from 'swr';

import { getUserData } from '@/server/user';
import { VityUser, PrismaUser, PrivyUser } from '@/types/db';
import { logger } from '../../logger';
import { loadFromCache, saveToCache } from "@/utils/cache";


/**
 * Extended interface for VityUser that includes Privy functionality
 * Omits 'user' and 'ready' from PrivyInterface to avoid conflicts
 */
type VityUserInterface = Omit<PrivyInterface, 'user' | 'ready'> & {
  isLoading: boolean;
  user: VityUser | null;
};

/**
 * Fetches VityUser data from the server
 * @param {PrivyUser} privyUser The authenticated Privy user
 * @returns {Promise<VityUser | null>} User data or null if fetch fails
 */
async function fetchVityUserData(
  privyUser: PrivyUser,
): Promise<VityUser | null> {
  try {
    const response = await getUserData();
    if (response?.data?.success && response?.data?.data) {
      const prismaUser: PrismaUser = response.data.data;
      logger('Retrieved PrismaUser data from server', JSON.stringify(prismaUser), {
        module: 'useUser',
        level: 'info',
      });
      return {
        ...prismaUser,
        privyUser: privyUser as PrivyUser,
      } as VityUser;
    }
    logger('Server returned unsuccessful user data response', response?.data?.error, {
      module: 'useUser',
      level: 'error',
    });
    return null;
  } catch (error) {
    logger('Error fetching user data', error, {
      module: 'useUser',
      level: 'error',
    });
    return null;
  }
}

/**
 * Custom hook for managing VityUser data fetching, caching, and synchronization
 * Combines Privy authentication with our user data management system
 * @returns {VityUserInterface} Object containing user data, loading state, and Privy interface methods
 */
export function useUser(): VityUserInterface {
  const { ready, user: privyUser, ...privyRest } = usePrivy();
  const [initialCachedUser, setInitialCachedUser] = useState<VityUser | null>(
    null,
  );
  const router = useRouter();

  // Load cached user data on component mount
  useEffect(() => {
    const cachedUser = loadFromCache('vity-user-data');
    setInitialCachedUser(cachedUser);
  }, []);

  // Define SWR key based on Privy authentication state
  const swrKey = ready && privyUser?.id ? `user-${privyUser.id}` : null;
  logger('SWR Key', swrKey, {
    module: 'useUser',
    level: 'info',
  });

  /**
   * SWR fetcher function that combines server data with Privy user data
   * @returns {Promise<VityUser | null>} Combined user data or null
   */
  const fetcher = useCallback(async (): Promise<VityUser | null> => {
    if (!ready || !privyUser) {
      logger('Privy not ready or user not logged in', null, {
        module: 'useUser',
        level: 'info',
      });
      return null;
    }

    if (privyUser) {
      logger('Fetching VityUser data from server', null, {
        module: 'useUser',
        level: 'info',
      });
      const vityUser = await fetchVityUserData(privyUser as PrivyUser);
      logger('Merged VityUser data', JSON.stringify(vityUser), {
        module: 'useUser',
        level: 'info',
      });
      return vityUser;
    }
    logger('No valid VityUser data retrieved', null, {
      module: 'useUser',
      level: 'warn',
    });
    return null;
  }, [ready, privyUser]);

  // Use SWR for data fetching and state management
  const { data: VityUser, isValidating: swrLoading } = useSWR<VityUser | null>(
    swrKey,
    fetcher,
    {
      fallbackData: initialCachedUser,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );

  logger('Current VityUser data', JSON.stringify(VityUser), {
    module: 'useUser',
    level: 'info',
  });
  logger('SWR validation status', swrLoading, {
    module: 'useUser',
    level: 'info',
  });

  // Update cache when new user data is fetched
  useEffect(() => {
    if (VityUser) {
      saveToCache('vity-user-data', VityUser);
    }
  }, [VityUser]);

  const isLoading = swrLoading && !initialCachedUser;
  logger('Loading state', isLoading, {
    module: 'useUser',
    level: 'info',
  });

  /**
   * Enhanced logout function that handles both Privy logout and local cache clearing
   * Includes navigation to refresh page and redirect to home
   */
  const extendedLogout = useCallback(async () => {
    logger('Initiating user logout...', null, {
      module: 'useUser',
      level: 'info',
    });

    router.push('/refresh');

    try {
      await privyRest.logout();
      saveToCache('vity-user-data', null);
      logger('User logged out and cache cleared', null, {
        module: 'useUser',
        level: 'info',
      });
      router.replace('/');
    } catch (error) {
      logger('Error during logout process', error, {
        module: 'useUser',
        level: 'error',
      });
      router.replace('/');
    }
  }, [privyRest, router]);

  return {
    ...privyRest,
    isLoading: isLoading || VityUser == null,
    user: VityUser || null,
    logout: extendedLogout,
  };
}
