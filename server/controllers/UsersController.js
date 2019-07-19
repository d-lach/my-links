import Controller from "../framework/Controller";

class UsersController extends Controller {

    /**
     * @param { {usersRepository} }  users
     */
    constructor({usersRepository}) {
        super();
        this.users = usersRepository;
    }

    index(req) {
        this.send(req.user);
    }

    logIn(req) {
        this.send("not implemented");
    }

    async signUp(req) {
        this.users.create(req.body)
            .then(this.updated)
            .catch(this.handleError);
    }
}

export default UsersController.factory;