export default class InternalError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.httpErrorCode = 500;
        this.data = {
            message: message,
            code: 500
        };

        // This clips the constructor invocation from the stack trace.
        // It's not absolutely essential, but it does make the stack trace a little nicer.
        //  @see Node.js reference (bottom)
        Error.captureStackTrace(this, this.constructor);
    }
}
