const mongoose = require('mongoose');
const mongoConfig = require('../config/mongo.config.js');
mongoose.connect(mongoConfig.connString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Mongodb Connected"))
    .catch(err => console.log(err))
