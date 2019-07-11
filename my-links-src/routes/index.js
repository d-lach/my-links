let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.status(204).send({});
});

export default router;
