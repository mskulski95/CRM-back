const express = require('express');
const router = express.Router()
const ClientController = require('../controllers/ClientControllers')

module.exports = () => {
    router.get('/', ClientController.index)
    router.get('/:id', ClientController.client)
    router.put('/edit/:id', ClientController.update)
    router.post('/add', ClientController.create)
    router.delete('/delete/:id', ClientController.delete)
    return router;
}