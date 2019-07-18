export default class Errors {
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

    static get missingToken() {
        return Errors._createError(ErrorType.MissingToken, "Token required");
    }

    static get emailInUse() {
        return Errors._createError(ErrorType.EmailInUse, "Email already in use");
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

export const ErrorType = {
    InvalidRequest: "Invalid request",
    Unauthorized: "Unauthorized",
    InvalidCredentials: "Invalid credentials",
    MissingToken: "Missing token",
    NotFound: "Not found",
    EmailInUse: "Email in use",
    InvalidModel: "ValidationError", // mongoose validation error
    TokenExpired: "TokenExpiredError" // jwt authentication error
};

