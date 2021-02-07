const express = require('express');
const FeedController = require('../controllers/feed-controller');
const router = express.Router();

// routes
router.post('/insert',FeedController.submit);
router.get('/', FeedController.getAll);
router.get('/:id_viagens', FeedController.getFeedById);
router.get('/user/:id_user', FeedController.getFeedUserById);
router.delete('delete/:id_viagens', FeedController.delete);




module.exports = router;