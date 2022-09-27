const express = require('express');
const router = express.Router();
const logsCtrl = require('../../controllers/logs');
const multer = require('multer');
const upload = multer()
// /*---------- Public Routes ----------*/
router.log('/',  upload.single('photo'), logsCtrl.create);
router.get('/', logsCtrl.index)


/*---------- Protected Routes ----------*/
module.exports = router;