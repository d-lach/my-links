/**
 * @param { {linksController, usersController} } app
 */
export default function (app) {
    let express = require('express');
    let router = express.Router();


    let linksRoutes = express.Router({mergeParams: true});

    linksRoutes.get('/', app.linksController.all);
    linksRoutes.get('/:link', app.linksController.show);
    linksRoutes.post('/', app.linksController.create);
    linksRoutes.put('/:link', app.linksController.update);
    linksRoutes.delete('/:link', app.linksController.destroy);

    router.use('/link', linksRoutes);

    let usersRoutes = express.Router({mergeParams: true});
    let publicUserRoutes = express.Router({mergeParams: true});

    usersRoutes.get('/me', app.usersController.index);

    publicUserRoutes.post('/', app.usersController.signUp);
    publicUserRoutes.post('/login', app.usersController.logIn);

    router.use('/anonymous', publicUserRoutes);

    return router;
}
