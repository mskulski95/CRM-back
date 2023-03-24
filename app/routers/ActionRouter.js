const express = require('express');
const router = express.Router();
const ActionController = require('../controllers/ActionController');

module.exports = () => {
    router.get('/', ActionController.index)
    router.post('/add', ActionController.create)
    router.delete('/delete/:id', ActionController.delete)
    return router;
}
