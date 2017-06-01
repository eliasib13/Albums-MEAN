'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Carga de rutas
var albumRoutes = require('./routes/album');
var imageRoutes = require('./routes/image');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configuración de cabeceras
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
    res.header('Allow', 'GET, POST, PUT, OPTIONS, DELETE');

    next();
});

// Configuración de rutas base
app.use('/api', albumRoutes);
app.use('/api', imageRoutes);

module.exports = app;