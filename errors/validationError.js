import {
    VALIDATED_FIELD_MAPS
} from "./../config/config";

export default class ValidationError extends Error {
    constructor(validatedFields) {
        super(`An field has failed validation.`);
        this.name = this.constructor.name;
        this.httpErrorCode = 400;
        this.data = typeof validatedFields === 'string' ? [{
            message: `${VALIDATED_FIELD_MAPS[validatedFields]} already exist. If you forgot your password, please see forgot password.`,
            field: validatedFields,
            code: 409
        }] : validatedFields;

        // This clips the constructor invocation from the stack trace.
        // It's not absolutely essential, but it does make the stack trace a little nicer.
        //  @see Node.js reference (bottom)
        Error.captureStackTrace(this, this.constructor);
    }
}
