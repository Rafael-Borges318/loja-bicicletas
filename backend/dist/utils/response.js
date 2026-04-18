export const sendSuccess = (res, statusCode, message, data) => {
    const response = {
        success: true,
        message,
        data,
    };
    return res.status(statusCode).json(response);
};
export const sendError = (res, statusCode, message, errorDetails) => {
    const response = {
        success: false,
        message,
        error: errorDetails,
    };
    return res.status(statusCode).json(response);
};
//# sourceMappingURL=response.js.map