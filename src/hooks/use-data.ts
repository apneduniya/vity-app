'use client';

import useSWR from "swr";
import { fetchData } from "@/services/fetchers";
import { useEffect, useState, useCallback } from "react";
import { logger } from "../../logger";
import { loadFromCache, saveToCache } from "@/utils/cache";

/**
 * Custom hook to fetch data using SWR with caching.
 * @param endpoint - API endpoint to fetch data from
 * @returns Data, error, and loading state
 */
export const useToolAppData = (endpoint: string) => {
  const [initialCachedData, setInitialCachedData] = useState<any | null>(null);

  // Generate a unique key based on the endpoint
  const cacheKey = `cache_${endpoint}`;

  // Load cached data on component mount
  useEffect(() => {
    const cachedData = loadFromCache(cacheKey);
    setInitialCachedData(cachedData);
  }, [cacheKey]);

  /**
   * SWR fetcher function that fetches data from the server
   * @returns {Promise<any | null>} Fetched data or null if fetch fails
   */
  const fetcher = useCallback(async (): Promise<any | null> => {
    try {
      const data = await fetchData(endpoint);
      logger('Fetched data from server', JSON.stringify(data), {
        module: 'useData',
        level: 'info',
      });
      return data;
    } catch (error) {
      logger('Error fetching data', error, {
        module: 'useData',
        level: 'error',
      });
      throw error;
    }
  }, [endpoint]);

  // Use SWR for data fetching and state management
  const { data, error, isValidating: swrLoading } = useSWR(endpoint, fetcher, {
    fallbackData: initialCachedData,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  logger('Current data', JSON.stringify(data), {
    module: 'useData',
    level: 'info',
  });
  logger('SWR validation status', swrLoading, {
    module: 'useData',
    level: 'info',
  });

  // Update cache when new data is fetched
  useEffect(() => {
    if (data) {
      saveToCache(cacheKey, data);
    }
  }, [data, cacheKey]);

  const isLoading = swrLoading && !initialCachedData;
  logger('Loading state', isLoading, {
    module: 'useData',
    level: 'info',
  });

  return {
    data,
    error,
    isLoading,
  };
};
