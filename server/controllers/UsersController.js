import Controller from "../framework/Controller";
import Errors from "../Errors";

class UsersController extends Controller {

    /**
     * @param { {links} }  links
     */
    constructor({users}) {
        super();
        this.users = users;
    }

    index(req) {
        this.send(req.user);
    }

    logIn(req) {

    }

    async create(req) {
        this.users.create(req.body)
            .then(this.updated)
            .catch(this.handleError);
    }
}

export default UsersController.factory;