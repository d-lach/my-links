/**
 * @param { {linksController, usersController, privateLinksController, authorization, linksResolver} } app
 */
export default function (app) {
    let express = require('express');
    let router = express.Router();

    let {jwtAuth, userSetter} = app.authorization;
    let {resolve:resolveLink} = app.linksResolver;

    let linksRoutes = express.Router({mergeParams: true});

    linksRoutes.get('/', app.linksController.all);
    linksRoutes.get('/:link', resolveLink, app.linksController.show);
    linksRoutes.post('/', app.linksController.create);
    linksRoutes.put('/:link', resolveLink, app.linksController.update);
    linksRoutes.delete('/:link', resolveLink, app.linksController.destroy);

    router.use('/link', linksRoutes);

    let usersRoutes = express.Router({mergeParams: true});
    let publicUserRoutes = express.Router({mergeParams: true});

    usersRoutes.get('/me', app.usersController.index);
    usersRoutes.get('/link', app.privateLinksController.index);
    usersRoutes.get('/link/:link', resolveLink, app.privateLinksController.show);
    usersRoutes.post('/link', app.privateLinksController.create);
    usersRoutes.put('/link/:link', resolveLink, app.privateLinksController.update);
    usersRoutes.delete('/link/:link', resolveLink, app.privateLinksController.destroy);

    publicUserRoutes.post('/', app.usersController.signUp);
    publicUserRoutes.post('/login', app.usersController.logIn);

    router.use('/user', [jwtAuth, usersRoutes]);
    router.use('/anonymous', publicUserRoutes);

    return router;
}
