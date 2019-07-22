/**
 * @param { {linksController, usersController, privateLinksController, authorization} } app
 */
export default function (app) {
    let express = require('express');
    let router = express.Router();

    let {jwtAuth, userSetter} = app.authorization;

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
    usersRoutes.get('/link', app.privateLinksController.index);
    usersRoutes.get('/link/:link', app.privateLinksController.show);
    usersRoutes.post('/link', app.privateLinksController.create);
    usersRoutes.put('/link/:link', app.privateLinksController.update);
    usersRoutes.delete('/link/:link', app.privateLinksController.destroy);

    publicUserRoutes.post('/', app.usersController.signUp);
    publicUserRoutes.post('/login', app.usersController.logIn);

    router.use('/user', [jwtAuth, usersRoutes]);
    router.use('/anonymous', publicUserRoutes);

    return router;
}
