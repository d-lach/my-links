import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import Database from "./database/Database";
import webRoutes from './routes/web';
import apiRoutes from './routes/api';
import appBootstrap from './bootstrap';

export const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', webRoutes(appBootstrap));
app.use('/api', apiRoutes(appBootstrap));
app.use(appBootstrap.errorsHandler.handle);

async function start() {
    await Database.initialize();

    await new Promise((resolve, reject) => {
        app.listen(process.env.APP_PORT, () => {
            console.log("Listening at", process.env.APP_PORT);
            resolve();
        });
    });

    app.emit('ready');
}

start();

