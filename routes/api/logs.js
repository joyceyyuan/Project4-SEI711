const express = require('express');
const router = express.Router();
const logsCtrl = require('../../controllers/logs');
const multer = require('multer');
const upload = multer()
// /*---------- Public Routes ----------*/
router.post('/',  upload.single('photo'), logsCtrl.create);
router.get('/', logsCtrl.index)
router.delete('/:id', logsCtrl.deleteLog)


/*---------- Protected Routes ----------*/
module.exports = router;