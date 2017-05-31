'use strict';

var Image = require('../models/image');
var Album = require('../models/album');

function pruebas(req, res) {
    res.status(200).send({message: 'Pruebas de controlador de imagenes'});
}

module.exports = {
    pruebas
}