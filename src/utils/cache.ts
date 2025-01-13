import { logger } from "../../logger";

/**
 * Loads cached data from localStorage
 * @param {string} key - The key to load data from
 * @returns {any | null} Cached data or null if not found/invalid
 */
export function loadFromCache(key: string): any | null {
  try {
    const cached = localStorage.getItem(key);
    if (cached) {
      logger('Loading data from cache', cached, {
        module: 'cache',
        level: 'info',
      });
      return JSON.parse(cached);
    }
    logger('No data found in cache', null, {
      module: 'cache',
      level: 'info',
    });
    return null;
  } catch (error) {
    logger('Failed to load cached data', error, {
      module: 'cache',
      level: 'error',
    });
    return null;
  }
}

/**
 * Saves data to localStorage
 * @param {string} key - The key to save data under
 * @param {any | null} data - Data to cache or null to clear cache
 */
export function saveToCache(key: string, data: any | null) {
  try {
    if (data) {
      localStorage.setItem(key, JSON.stringify(data));
      logger('Data saved to cache', JSON.stringify(data), {
        module: 'cache',
        level: 'info',
      });
    } else {
      localStorage.removeItem(key);
      logger('Data removed from cache', null, {
        module: 'cache',
        level: 'info',
      });
    }
  } catch (error) {
    logger('Failed to update data cache', error, {
      module: 'cache',
      level: 'error',
    });
  }
}
