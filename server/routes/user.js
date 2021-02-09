const express = require('express');
const UserController = require('../controllers/user-controller');
const router = express.Router();

// routes
router.post('/:id',UserController.edit);
router.get('/:id', UserController.getUser);

module.exports = router;