const express = require('express');
const UserController = require('../controllers/user-controller');
const router = express.Router();

// routes
router.post('/:id',UserController.edit);
router.get('/:id', UserController.getUser);
router.delete('/:id', UserController.delete);

module.exports = router;