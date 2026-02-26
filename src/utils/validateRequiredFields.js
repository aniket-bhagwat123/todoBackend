export const validateRequiredFields = (data = {}, requiredFields = []) => {
    for (const field of requiredFields) {
        // field not sent at all
        if (!(field in data)) {
            throw {
                status: 400,
                message: `${field} is required`
            };
        }

        // field sent but empty
        const value = data[field];
        if (
            value === undefined ||
            value === null ||
            (typeof value === 'string' && value.trim() === '')
        ) {
            throw {
                status: 400,
                message: `${field} should not be empty`
            };
        }
    }
};
