const express = require('express');
const AuthController = require('../controllers/auth-controller');
const router = express.Router();

// routes
router.post('/register', AuthController.register);
router.post('/login',AuthController.login);
router.post('/forgot',AuthController.forgot);



module.exports = router;