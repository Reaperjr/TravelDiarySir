const express = require('express');
const FeedController = require('../controllers/feed-controller');
const router = express.Router();

// routes
router.post('/insert',FeedController.submit);
router.get('/', FeedController.getAll);
router.get('/:id_user', FeedController.getById);
router.delete('/:id_viagem', FeedController.delete);
router.put('/updates', FeedController.updates);




module.exports = router;