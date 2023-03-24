const config = require('./config')
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
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
app.use(cookieParser());

const clientRouters = require('./app/routers/ClientRouter')()
app.use('/client', clientRouters)
const actionRouters = require('./app/routers/ActionRouter')()
app.use('/action', actionRouters)
const userRouters = require('./app/routers/UserRouter')()
app.use('/user', userRouters)


app.listen(config.app.port, () => {
    console.log('Express started :)');
})