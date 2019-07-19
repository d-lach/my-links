/**
 * @param { {linksRepository} } app
 */
export default function (app) {
    let express = require('express');
    let router = express.Router();

    router.get('/', function (req, res, next) {
        res.status(204).send({});
    });

    router.get(encodeURI('/>/:link'), function (req, res, next) {
        app.linksRepository.findTarget(req.params.link)
            .then(({target}) => {
                res.redirect(target);
            })
    });

   return router;
}
