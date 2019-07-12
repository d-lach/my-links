import LinksController from "../controllers/LinksController";

/**
 * @param { {links} } app
 */
export default function (app) {
    let express = require('express');
    let router = express.Router();

    let linksRoutes = express.Router({mergeParams: true});

    linksRoutes.get('/link', LinksController(app).all);
    linksRoutes.post('/link', LinksController(app).create);

    router.use(linksRoutes);

    return router;
}
