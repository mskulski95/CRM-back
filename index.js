const config = require('./config')
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoUrl = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`
mongoose
    .connect(mongoUrl, {})
    .then(()=>{
        console.log('Mongoose connected');
    })
    .catch((err)=>{
        throw err
    })
const app = express();

app.use(express.json());
const router = ('express-router');
app.use(cors());

const clientRouters = require('./app/routers/ClientRouter')()
app.use('/client', clientRouters)


app.listen(config.app.port, () => {
    console.log('Express started :)');
})