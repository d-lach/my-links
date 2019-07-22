import Errors from "../Errors";
import boundClass from 'autobind-decorator';
import Middleware from "../framework/Middleware";

@boundClass
class Authorization extends Middleware {
    constructor({authService}) {
        super();
        this.authService = authService;
    }

    jwtAuth(req, res, next) {
        if (!this.token)
            Errors.missingToken.throw();

        this.authService.retrieveUser(this.token)
            .then(user => this.user = user)
            .then(() => next())
            .catch(next);
    }

    privilegesGuard(requiredLevel) {
        return function (req, res, next) {
            if (req.user.permissions < requiredLevel)
                Errors.unauthorized.throw();

            next();
        };
    };

    get token() {
        if (this.req.headers.authorization)
            return this.req.headers.authorization.split(' ')[1]; // Bearer token

        if (this.req.query['x-token'])
            return this.req.query['x-token'];

        return this.req.cookies.token;
    }

    get user() {
        return this.req.user;
    }

    set user(u) {
        this.req.user = u;
    }
}

export default Authorization.factory;