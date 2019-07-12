import Links from "../repositories/LinksRepository";

let express = require('express');
let router = express.Router();

router.get('/', function (req, res, next) {
    res.status(204).send({});
});

router.get(encodeURI('/>/:link'), function (req, res, next) {
    Links.findTarget(req.params.link)
        .then(({target}) => {
            res.redirect(target);
        })
});

export default router;
