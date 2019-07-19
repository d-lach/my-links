import Errors from "../Errors";

import fs from 'fs';
import path from "path";
import jwt from 'jsonwebtoken';

export default class AuthService {

    constructor({usersRepository, passwordChecker}) {
        this.users = usersRepository;
        this.checkPassword = passwordChecker;

        this.jwtConfig = {
            issuer: process.env.JWT_ISSUER,
            subject: "visitor",
            expiresIn: "12h"
        };

        let configPath = path.join(__dirname, '..', '..', ".config");
        this.keys = {
            private: fs.readFileSync(path.join(configPath, 'jwt.key'), 'utf8'),
            public: fs.readFileSync(path.join(configPath, 'jwt.key.pub'), 'utf8'),
        };

        this.signConfig = Object.assign({algorithm: "RS256"}, this.jwtConfig);
        this.verificationConfig = Object.assign({algorithm: ["RS256"]}, this.jwtConfig);
    }

    async signIn({email, password}) {
        const user = await this.users.find(email);
        if (!user || !this.checkPassword(password, user.hash))
            Errors.invalidCredentials.throw();
        return this.refreshToken(user);
    }

    async retrieveUser(token) {
        let userId = jwt.verify(token, this.keys.public, this.verificationConfig).id;
        let user = await this.users.get(userId);

        if (!user)
            Errors.invalidToken.throw();

        return user;
    };

    generateTokenPayload(user) {
        return {
            id: user._id,
            email: user.email
        };
    }


    refreshToken (user) {
        return jwt.sign(this.generateTokenPayload(user), this.keys.private, this.signConfig);
    };
}