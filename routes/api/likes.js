const express = require('express');
const router = express.Router();
const likesCtrl = require('../../controllers/likes')

router.post('/posts/:id/likes', likesCtrl.createLike)
router.delete('/likes/:id', likesCtrl.deleteLike)

module.exports = router;