export default class NotFoundError extends Error {
    constructor(id) {
        super(`The request resource has not been found${id ? `at ${id}` : ''}.`);
        this.name = this.constructor.name;
        this.httpErrorCode = 404;
        this.data = {
            message: `The request resource has not been found${id ? `at ${id}` : ''}.`,
            code: 404
        };
        // This clips the constructor invocation from the stack trace.
        // It's not absolutely essential, but it does make the stack trace a little nicer.
        //  @see Node.js reference (bottom)
        Error.captureStackTrace(this, this.constructor);
    }
}
