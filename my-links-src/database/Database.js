const mongoose = require('mongoose');

let initialized = false;

export default class Database {
    static initialize() {
        if (initialized)
            return Promise.resolve();
        initialized = true;
        mongoose.connection.on("error", (e) => {
            initialized = false;
            console.error("DB connection error:", e);
        });
        mongoose.connection.once("open", () => console.log("DB connected")); // () =>

        return mongoose.connect(Database.host, {useNewUrlParser: true})
            .catch((r) => {
                initialized = false;
                console.error("failed to establish DB connection");
                throw r;
            });
    }

    static get host() {
        return 'mongodb://'
            + process.env.DB_USER +
            ':' + process.env.DB_PASSWORD +
            "@" + process.env.DB_CONNECTION +
            ':' + process.env.DB_PORT +
            '/' + process.env.DB_NAME;
    }
}