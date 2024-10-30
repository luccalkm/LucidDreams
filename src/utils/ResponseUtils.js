export const responseObject = (success = true, data = null, message = "") => ({
    success,
    data,
    message,
});
