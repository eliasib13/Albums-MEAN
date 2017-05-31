'use strict';

var express = require('express');
var ImageController = require('../controllers/image');
var api = express.Router();

api.get('/prueba-image', ImageController.pruebas);

module.exports = api;