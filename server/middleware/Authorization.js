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