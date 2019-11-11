import ValidationError from './../errors/validationError';

export default (schema) => {
    return (req, res, next) => {
        if (!schema) next();
        const _validationOptions = {
            abortEarly: false, // abort after the last validation error
            allowUnknown: true, // allow unknown keys that will be ignored
            stripUnknown: true // remove unknown keys from the validated data
        };
        const { error } = schema.validate(req.body, _validationOptions);
        if (!error) return next();
        next(new ValidationError(error.details.map((err) => {
            return {
                message: err.message,
                field: err.path[err.path.length - 1],
                code: 400
            }
        })));
    };
};