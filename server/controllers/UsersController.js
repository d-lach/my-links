import Controller from "../framework/Controller";

class UsersController extends Controller {

    constructor({usersRepository, authService}) {
        super();
        this.users = usersRepository;
        this.auth = authService;
    }

    index(req) {
        this.send(req.user);
    }

    logIn(req, res) {
        this.auth.signIn(req.body)
            .then((token) => {
                res.cookie('token', token, {secure: false, httpOnly: false, maxAge: 1209600000});
                this.send({token});
            })
            .catch(this.handleError);
    }

    async signUp(req) {
        this.users.create(req.body)
            .then(this.updated)
            .catch(this.handleError);
    }
}

export default UsersController.factory;