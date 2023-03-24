const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        require: true
    },
    nip: {
        type: Number
    },
    tel: {
        type: String
    },
    actions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Action'
    }]

})

module.exports = mongoose.model('Client', ClientSchema)