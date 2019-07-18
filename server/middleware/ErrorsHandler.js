import {ErrorType} from "../Errors";

export default function ErrorsHandler(err, req, res, next) {
    // custom application error
    if (typeof (err) === 'string') {
        return res.status(500).json({message: err});
    }

    let errorResponse = {
        message: err.message
    };

    console.log(err);

    switch (err.name) {
        case ErrorType.InvalidRequest:
        case ErrorType.InvalidModel:
        case ErrorType.InvalidCredentials:
        case ErrorType.EmailInUse:
            return res.status(400).json(errorResponse);

        case ErrorType.TokenExpired:
            errorResponse.message = 'Invalid Token';
        case ErrorType.Unauthorized:
        case ErrorType.MissingToken:
            return res.status(401).json(errorResponse);

        case ErrorType.NotFound:
            return res.status(404).json(errorResponse);

        default:
            return res.status(500).json(errorResponse);
    }
}
