const mongoose = require('mongoose');

let initializing = false;
let upAndRunning = false;
let isSetup = false;
let maxRetries = 3;

export default class Database {
    static isUp() {
        return upAndRunning;
    }

    static async initialize() {
        if (initializing)
            return Promise.resolve();

        initializing = true;
        Database.setup();

        let attempt = 0;
        while (!Database.isUp() && attempt < maxRetries) {
            try {
                await Database.up();
            } catch {
                await (new Promise(resolve => setTimeout(resolve, 1000)));
                attempt++;
            }
        }

        if (!Database.isUp())
            throw new Error("Cannot connect do database");
    }

    static setup() {
        if (isSetup) {
            return;
        }

        isSetup = true;
        mongoose.connection.on("error", (e) => {
            initializing = false;
            console.error("DB connection error:", e);
        });
        mongoose.connection.once("open", () => {
            upAndRunning = true;
            console.log("DB connected")
        });
    }

    static up() {
        return mongoose.connect(Database.host, {
            useCreateIndex: true,
            useNewUrlParser: true
        })
            .catch((r) => {
                initializing = false;
                upAndRunning = false;
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