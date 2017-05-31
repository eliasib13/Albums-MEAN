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

// Configuración de rutas base
app.use('/api', albumRoutes);
app.use('/api', imageRoutes);

module.exports = app;