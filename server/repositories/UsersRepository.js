import UserModel from '../database/models/User';
import Errors from "../Errors";

const bcrypt = require('bcrypt');

export default {
    getAll() {
        return UserModel.find();
    },

    removeAll() {
        return UserModel.deleteMany({});
    },

    create(userData) {
        return this._prepareNewUser(userData)
            .then(user => user.save())
            .catch((err) => {
                if (err.name === 'MongoError')
                    Errors.emailInUse.throw();
                throw err;
            });
    },

    addMany(usersData) {
        return Promise.all(usersData.map(this._prepareNewUser))
            .then(UserModel.insertMany);
    },

    get(id) {
        return UserModel.findById(id);
    },

    find(email) {
        return UserModel.findOne({email});
    },

    async _prepareNewUser(userData) {
        try {
            userData.hash = await bcrypt.hash(userData.password, 10);
        } catch (err) {
            // todo original error should be logged
            Errors.invalidRequest.message("Cannot hash given password").throw();
        }
        return new UserModel(userData);
    },
}