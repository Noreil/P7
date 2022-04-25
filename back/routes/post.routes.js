const router = require('express').Router();
const postCtrl = require('../controllers/post.controllers');

router.get('/', postCtrl.readPost);
router.post('/', postCtrl.createPost);

module.exports = router;
