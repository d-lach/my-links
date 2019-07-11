import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import Database from "./database/Database";
import indexRouter from './routes/index';

export const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

async function start() {
    await Database.initialize();
    await new Promise((resolve, reject) => {
        app.listen(process.env.PORT, () => {
            console.log("Listening at", process.env.PORT);
            resolve();
        });
    });

    app.emit('ready');
}

start();

