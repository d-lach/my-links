import Errors from "../Errors";
import boundClass from 'autobind-decorator';
import Middleware from "../framework/Middleware";

@boundClass
class LinksPermissionsGuard extends Middleware {
    constructor({permissions}) {
        super();
        this.permissions = permissions;

        this.resource = 'link';
    }

    guardPublic(req, res, next) {
        if (!this.getPermissionsPredicate(true).granted)
            Errors.unauthorized.throw();

        next();
    }

    guard(req, res, next) {
        if (!this.getPermissionsPredicate().granted || (req.link && !req.link.owner.equals(req.user._id)))
            Errors.unauthorized.throw();
        next();
    }

    getPermissionsPredicate(isPublic = false) {
        let permissionPredicate = this.permissions.can(this.role);

        switch (this.req.method) {
            case 'POST':
                return isPublic ? permissionPredicate.createAny(this.resource) : permissionPredicate.createOwn(this.resource);
            case 'PUT':
                return isPublic ? permissionPredicate.updateAny(this.resource) : permissionPredicate.updateOwn(this.resource);
            case 'DELETE':
                return isPublic ? permissionPredicate.deleteAny(this.resource) : permissionPredicate.deleteOwn(this.resource);
            case 'GET':
                return isPublic ? permissionPredicate.readAny(this.resource) : permissionPredicate.readOwn(this.resource);
            default:
                throw Error("Guard not registered for " + this.req.method + " method");
        }
    }

    get role() {
        return this.req.user ? this.req.user.role : 'visitor';
    }
}

export default LinksPermissionsGuard.factory;