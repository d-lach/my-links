import Controller from "../framework/Controller";
import Errors from "../Errors";

class PrivateLinksController extends Controller {

    constructor({privateLinksRepository}) {
        super();
        this.privateLinks = privateLinksRepository;
    }

    index(req) {
        this.privateLinks.getAll(req.user)
            .then(this.send)
            .catch(this.handleError);
    }

    show(req) {
        this.privateLinks.get(req.user, req.params.link)
            .then(this.send)
            .catch(this.handleError);
    }

    create(req) {
        this.privateLinks.add(req.user, req.body)
            .then(this.updated)
            .catch(this.handleError);
    }

    update(req) {
        Errors.notImplemented.throw();
    }

    destroy(req) {
        Errors.notImplemented.throw();
    }
}

export default PrivateLinksController.factory;