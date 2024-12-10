"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponse = void 0;
const createResponse = (options) => {
    const { status, statusCode, message, data, error } = options;
    return {
        status,
        statusCode,
        message,
        data,
        error,
        timestamp: new Date().toISOString(),
    };
};
exports.createResponse = createResponse;
//# sourceMappingURL=api_response.js.map