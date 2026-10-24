const AppError = require('../utils/AppError');

const validate = (schema) =>  (req, res, next) => {
    const result = schema.safeParse(req.body);

    if(!result.success) {
        const errorMessage = result.error.issues.map((err) => err.message).join(', ');
        throw new AppError(errorMessage, 400);
    }

    req.body = result.data;
    next();
}

module.exports = validate;