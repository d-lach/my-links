import LinksRepository from "./repositories/LinksRepository";
import UsersRepository from "./repositories/UsersRepository";
import AuthService from "./services/AuthService";
import Authorization from "./middleware/Authorization";
import ErrorsHandler from "./middleware/ErrorsHandler";

// import {awilix} from "awilix";
const DependencyInjector = require('awilix');
// console.log("awilix:", DependencyInjector);

let bootstrap = DependencyInjector.createContainer();
/*{
    links: LinksRepository,
    users: new UsersRepository(),
    middleware: {
        errorsHandler: ErrorsHandler,
        authorization: Authorization()
    },
    services: {
        authorization: new AuthService ()
    }
};*/
bootstrap.loadModules([
    'controllers/**/*.js',
    'middleware/**/*.js',
], {
    cwd : 'server',
    formatName: 'camelCase',
    register: DependencyInjector.asFunction,
});

bootstrap.loadModules([
    'repositories/**/*.js',
    'services/**/*.js',
], {
    cwd : 'server',
    formatName: 'camelCase',
    register: DependencyInjector.asClass,
});

export default bootstrap.cradle;