const User = require('../models/UserModel');
const bcrypt = require('bcrypt');


module.exports = {
    create: (req, res) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        user.save((err, user)=>{
            if (err) {
                return res.status(500).json({
                    message: 'Error while creating user',
                    error: err
                })
            }
            return res.status(201).json(user)
        });
    },

    login: (req, res) => {
        User.findOne({name: req.body.name}).exec((err, user) => {
            if(err) {
                res.send('Error');
                return;
            }
            if(!user) {
                return res.json({
                    message: 'That user not exist',
                    error: true
                })
            }
            else {
                bcrypt.compare(req.body.password, user.password, (err, logged) => {
                    if(err) {
                        return res.json({
                            message: 'Login error',
                            error: err,
                            user: {name: req.body.name, password: ''}
                        })
                    }
                    if(logged) {
                        const token = user.generateAuthToken(user);
                        res.json({jwt:token, name:user.name});
                    } else {
                        return res.json({
                            message: 'Login data do not match',
                            error: err,
                            user: {name: req.body.name, password: ''}
                        })
                    }
                })
            }
        })
    }
}