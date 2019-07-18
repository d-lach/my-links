import LinksControllerFactory from "../controllers/LinksController";
import UsersControllerFactory from "../controllers/UsersController";

/**
 * @param { {links } } app
 */
export default function (app) {
    let express = require('express');
    let router = express.Router();

    let linksRoutes = express.Router({mergeParams: true});
    let linksController = LinksControllerFactory(app);

    linksRoutes.get('/', linksController.all);
    linksRoutes.get('/:link', linksController.show);
    linksRoutes.post('/', linksController.create);
    linksRoutes.put('/:link', linksController.update);
    linksRoutes.delete('/:link', linksController.destroy);

    router.use('/link', linksRoutes);

    let publicUserRoutes = express.Router({mergeParams: true});

    let usersController = UsersControllerFactory(app);

    publicUserRoutes.post('/', usersController.create);

    router.use('/anonymous', publicUserRoutes);

    return router;
}
