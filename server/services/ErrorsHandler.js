export class Errors {
    static get invalidRequest() {
        return Errors._createError(ErrorType.InvalidRequest, "Provided data are malformed");
    }

    static get unauthorized() {
        return Errors._createError(ErrorType.Unauthorized, "You are not allowed to access that content");
    }

    static get invalidCredentials() {
        return Errors._createError(ErrorType.InvalidCredentials, "Username and password mismatch");
    }

    static get notFound() {
        return Errors._createError(ErrorType.NotFound, "Requested resource does not exist");
    }

    static _createError(type, msg) {
        let error = new Errors();
        error.msg = msg;
        error.type = type;

        return error;
    }

    constructor() {
        this.msg = null;
        this.type = null;
    }

    message(msg) {
        this.msg = msg;
        return this;
    }

    get() {
        let error = new Error(this.msg);
        error.name = this.type;

        return error;
    }

    throw() {
        throw this.get();
    }
};

export function ErrorsHandler(err, req, res, next) {
    // console.log("HANDLING SOME ERROR YO:", err);

    // custom application error
    if (typeof (err) === 'string') {
        return res.status(500).json({message: err});
    }

    let errorResponse = {
        message: err.message
    };

    switch (err.name) {
        case ErrorType.InvalidRequest:
        case ErrorType.ModelValidation:
        case ErrorType.InvalidCredentials:
            return res.status(400).json(errorResponse);

        case ErrorType.TokenExpired:
            errorResponse.message = 'Invalid Token';
        case ErrorType.Unauthorized:
            return res.status(401).json(errorResponse);

        case ErrorType.NotFound:
            return res.status(404).json(errorResponse);

        default:
            return res.status(500).json(errorResponse);
    }
}

const ErrorType = {
    InvalidRequest: "Invalid request",
    Unauthorized: "Unauthorized",
    InvalidCredentials: "Invalid credentials",
    NotFound: "Not found",
    ModelValidation: "ValidationError", // mongoose validation error
    TokenExpired: "TokenExpiredError" // jwt authentication error
};

