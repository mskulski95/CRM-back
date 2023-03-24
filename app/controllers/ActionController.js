const Client = require('../models/ClientModel')
const Action = require('../models/ActionModel');

module.exports = {
    index: (req, res) => {
        Action.find({}, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error while fetching action',
                    error: err
                })
            }
            res.json(result)
        })
    },
    create: (req, res) => {
        const action = new Action({
            type: req.body.type,
            date: req.body.date,
            description: req.body.description
        })
        action.save((err, action) => {
            if(err) {
                return res.json({
                    message: 'Error while creating action',
                    error: err
                })
            }
            Client.findById(req.body.customerId).exec((err, client) => {
                client.actions.push(action._id)
                client.save()
            })
            return res.status(201).json(action);
        })
    },
    delete: (req, res) => {
        const id = req.params.id

        Action.findByIdAndDelete(id, (err, action) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error while deleting action',
                    error: err
                })
            }
            return res.status(200).json({
                id: id,
                deleted: true
            })
        })
    }
}