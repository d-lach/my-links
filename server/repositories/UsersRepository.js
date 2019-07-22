import Errors from "../Errors";
import {boundMethod} from "autobind-decorator";

export default class UsersRepository {

    /**
     * @param { User } userModel
     * @param { function } passwordHasher
     */
    constructor({userModel, passwordHasher}) {
        this.hashPassword = passwordHasher;
        this.users = userModel;
    }

    getAll() {
        return this.users.find({});
    }

    removeAll() {
        return this.users.deleteMany({});
    }

    create(userData) {
        return this._prepareNewUser(userData)
            .then(user => user.save())
            .catch((err) => {
                if (err.name === 'MongoError')
                    Errors.emailInUse.throw();
                throw err;
            });
    }

    addMany(usersData) {
        return Promise.all(usersData.map(this._prepareNewUser))
            .then(this.users.insertMany);
    }

     get(id) {
        return this.users.findById(id);
    }

    find(email) {
        return this.users.findOne({email});
    }

    @boundMethod
    async _prepareNewUser(userData) {
        try {
            userData.hash = await this.hashPassword(userData.password);
        } catch (err) {
            // todo original error should be logged
            Errors.invalidRequest.message("Cannot hash given password").throw();
        }
        return new this.users(userData);
    }
}