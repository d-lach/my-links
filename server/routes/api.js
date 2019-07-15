import LinksControllerFactory from "../controllers/LinksController";

/**
 * @param { {links} } app
 */
export default function (app) {
    let express = require('express');
    let router = express.Router();

    let linksRoutes = express.Router({mergeParams: true});
    let linksController = LinksControllerFactory(app);

    linksRoutes.get('/link', linksController.all);
    linksRoutes.get('/link/:id', linksController.show);
    linksRoutes.post('/link', linksController.create);

    router.use(linksRoutes);

    return router;
}
