'use strict';

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3700;

// Using native promises due to deprecation warning on mpromise (mongoose's default promise library)
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/app_albums', (err, res) => {
    if (err) {
        throw err;
    }
    else {
        console.log("Base de datos funcionando correctamente.");

        app.listen(port, () => {
            console.log('API Restful de albums escuchando.');
        });
    }
})