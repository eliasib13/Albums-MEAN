'use strict';

var Image = require('../models/image');
var Album = require('../models/album');

function getImages(req, res) {
    var albumId = req.params.album;

    if (!albumId) {
        // Todas las imagenes en DB
        Image.find({}).sort('-title').exec((err, images) => {
            if (err) {
                res.status(500).send({message: 'Error en la peticion'});
            }
            else {
                if (!images) {
                    res.status(404).send({message: 'No hay imagenes'});
                }
                else {
                    Album.populate(images, {path: 'album'}, (err, images) => {
                        if (err) {
                            res.status(500).send({message: 'Error en la peticion'});
                        }
                        else {
                            res.status(200).send({images});
                        }
                    });
                }
            }
        });
    }
    else {
        // Todas las imagenes del album
        Image.find({album: albumId}).sort('-title').exec((err, images) => {
            if (err) {
                res.status(500).send({message: 'Error en la peticion'});
            }
            else {
                if (!images) {
                    res.status(404).send({message: 'No hay imagenes'});
                }
                else {
                    Album.populate(images, {path: 'album'}, (err, images) => {
                        if (err) {
                            res.status(500).send({message: 'Error en la peticion'});
                        }
                        else {
                            res.status(200).send({images});
                        }
                    });
                }
            }
        });
    }
}

function getImage(req, res) {
    var imageId = req.params.id;

    Image.findById(imageId, (err, image) => {
        if (err) {
            res.status(500).send({message: 'Error en la peticion'});
        }
        else {
            if (!image) {
                res.status(404).send({message: 'No existe la imagen'});
            }
            else {
                Album.populate(image, {path: 'album'}, (err, image) => {
                    if (err) {
                        res.status(500).send({message: 'Error en la peticion'});
                    }
                    else {
                        res.status(200).send(image);
                    }
                });
            }
        }
    });
}

function saveImage(req, res) {
    var image = new Image();
    
    var params = req.body;
    image.title = params.title;
    image.picture = null;
    image.album = params.album;

    image.save((err, imageStored) => {
        if (err) {
            res.status(500).send({message: 'Error en la peticion'});
        }
        else {
            if (!imageStored) {
                res.status(404).send({message: 'No existe la imagen'});
            }
            else {
                res.status(200).send(image);
            }
        }
    });
}

module.exports = {
    getImages,
    getImage,
    saveImage
}