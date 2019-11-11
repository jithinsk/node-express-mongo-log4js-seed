export default class TokenVerificationError extends Error {
    constructor() {
        super(`The token is either expired or invalid.`);
        this.name = this.constructor.name;
        this.httpErrorCode = 401;
        this.data = {
            message: `The token is either expired or invalid.`,
            code: 401
        };
        // This clips the constructor invocation from the stack trace.
        // It's not absolutely essential, but it does make the stack trace a little nicer.
        //  @see Node.js reference (bottom)
        Error.captureStackTrace(this, this.constructor);
    }
}
