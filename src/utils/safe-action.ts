import { createSafeActionClient } from 'next-safe-action';
import { logger } from '../../logger';

export const actionClient = createSafeActionClient({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleServerError(e, _) {
    logger('Loading user data from cache', e, {
      module: 'safe-action',
      level: 'error',
    });

    return {
      success: false,
      data: null,
      error: 'Internal server error',
    };
  },
});

export interface ActionResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export type ActionEmptyResponse = ActionResponse<null>;
