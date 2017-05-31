'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Carga de rutas
var albumRoutes = require('./routes/album');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configuración de cabeceras

// Configuración de rutas base
app.use('/api', albumRoutes);

module.exports = app;