import LinksRepository from "./repositories/LinksRepository";
import UsersRepository from "./repositories/UsersRepository";
import ErrorsHandler from "./middleware/ErrorsHandler";

let bootstrap = {
    links: LinksRepository,
    users: UsersRepository,
    middleware: {
        errorsHandler: ErrorsHandler
    }
};

export default bootstrap;