const router = require('express').Router();
const Army = require('../controllers/army.controller');

router.post('/create', Army.create);
router.post('/delete', Army.delete);

module.exports = router;
