/**
 * @param {{
     linksController,
     usersController,
     privateLinksController,
     authorization,
     linksResolver,
     linksPermissionsGuard
    }} app
 */
export default function (app) {
    let express = require('express');
    let router = express.Router();

    let {jwtAuth} = app.authorization;
    let {resolve: resolveLink} = app.linksResolver;
    let {guard: privateLinksGuard, guardPublic: publicLinksGuard} = app.linksPermissionsGuard;

    let linksRoutes = express.Router({mergeParams: true});

    linksRoutes.get('/', app.linksController.all);
    linksRoutes.get('/:link', [resolveLink, publicLinksGuard], app.linksController.show);
    linksRoutes.post('/', publicLinksGuard, app.linksController.create);
    linksRoutes.put('/:link', [resolveLink, publicLinksGuard], app.linksController.update);
    linksRoutes.delete('/:link', [resolveLink, publicLinksGuard], app.linksController.destroy);

    router.use('/link', linksRoutes);

    let usersRoutes = express.Router({mergeParams: true});
    let publicUserRoutes = express.Router({mergeParams: true});

    usersRoutes.get('/me', app.usersController.index);
    usersRoutes.get('/link', app.privateLinksController.index);
    usersRoutes.get('/link/:link', [resolveLink, privateLinksGuard], app.privateLinksController.show);
    usersRoutes.post('/link', privateLinksGuard, app.privateLinksController.create);
    usersRoutes.put('/link/:link', [resolveLink, privateLinksGuard], app.privateLinksController.update);
    usersRoutes.delete('/link/:link', [resolveLink, privateLinksGuard], app.privateLinksController.destroy);

    publicUserRoutes.post('/', app.usersController.signUp);
    publicUserRoutes.post('/login', app.usersController.logIn);

    router.use('/user', [jwtAuth, usersRoutes]);
    router.use('/anonymous', publicUserRoutes);

    return router;
}
