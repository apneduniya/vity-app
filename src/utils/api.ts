import { ApiResponse } from "@/types/api";


export function createApiResponse({success, data, message, error}: {success: boolean, data?: any, message?: string, error?: string}): ApiResponse {
    const response: ApiResponse = { success };

    if (data !== undefined) {
        response.data = data;
    }
    if (error !== undefined) {
        response.error = error;
    }
    if (message !== undefined) {
        response.message = message;
    }

    return response;
}


