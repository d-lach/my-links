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
    linksRoutes.get('/link/:link', linksController.show);
    linksRoutes.post('/link', linksController.create);
    linksRoutes.put('/link/:link', linksController.update);
    linksRoutes.delete('/link/:link', linksController.destroy);

    router.use(linksRoutes);

    return router;
}
