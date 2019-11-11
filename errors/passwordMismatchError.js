export default class PasswordMissMatchError extends Error {
    constructor() {
        super(`The username or password is incorrect.`);
        this.name = this.constructor.name;
        this.httpErrorCode = 401;
        this.data = {
            message: `The username or password is incorrect.`,
            code: 401
        };

        // This clips the constructor invocation from the stack trace.
        // It's not absolutely essential, but it does make the stack trace a little nicer.
        //  @see Node.js reference (bottom)
        Error.captureStackTrace(this, this.constructor);
    }
}
