const Client = require('../models/ClientModel')

module.exports = {
    index: (req, res) => {
        Client.find({}, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error while fetching client',
                    error: err
                })
            }
            res.json(result)
        })
    },
    client: (req, res) => {
        Client.findById(req.params.id).populate('actions').exec( (err, client) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error while opening client',
                    error: err
                })
            }
            res.json(client)
        })
    },
    create: (req, res) => {
        const client = new Client({
            name: req.body.name,
            city: req.body.city,
            street: req.body.street,
            zipCode: req.body.zipCode,
            nip: req.body.nip,
            tel: req.body.tel
        })
        client.save((err, client)=>{
            if (err) {
                return res.status(500).json({
                    message: 'Error while creating client',
                    error: err
                })
            }
            return res.status(201).json(client)
        })
    },
    update: (req, res) => {
        Client.findByIdAndUpdate(req.params.id, req.body, (err, client) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error while edit client',
                    error: err
                })
                
            }
            res.json(client)
        })
    },
    delete: (req, res) => {
        const id = req.params.id

        Client.findByIdAndDelete(id, (err, client) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error while deleting client',
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