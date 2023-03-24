const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

module.exports = () => {
    router.post('/signup', UserController.create);
    router.post('/login', UserController.login);
    return router;
}
