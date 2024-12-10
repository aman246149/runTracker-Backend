// responseHelper.ts

export interface ApiResponse<T = any> {
    status: 'success' | 'error';
    statusCode: number;
    message?: string;
    data?: T;
    error?: any;
    timestamp?: string;
}

/**
 * Formats and returns a consistent API response.
 * @param options - Options for customizing the response.
 * @returns The formatted API response.
 */
export const createResponse = <T = any>(options: {
    status: 'success' | 'error';
    statusCode: number;
    message?: string;
    data?: T;
    error?: any;
}): ApiResponse<T> => {
    const { status, statusCode, message, data, error } = options;

    return {
        status,
        statusCode,
        message,
        data,
        error,
        timestamp: new Date().toISOString(), // Adds a timestamp for tracking
    };
};
