'use strict';

var path = require('path');
var Image = require('../models/image');
var Album = require('../models/album');

function getImages(req, res) {
    var albumId = req.params.album;

    if (!albumId) {
        // Todas las imagenes en DB
        var find = Image.find({}).sort('title');
    }
    else {
        // Todas las imagenes del album
        var find = Image.find({album: albumId}).sort('title');
    }

    find.exec((err, images) => {
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

function updateImage(req, res) {
    var imageId = req.params.id;
    var update = req.body;

    Image.findByIdAndUpdate(imageId, update, (err, imageUpdated) => {
        if (err) {
            res.status(500).send({message: 'Error en la peticion'});
        }
        else {
            if (!imageUpdated) {
                res.status(404).send({message: 'No existe la imagen'});
            }
            else {
                res.status(200).send(image);
            }
        }
    });
}

function deleteImage(req, res) {
    var imageId = req.params.id;

    Image.findByIdAndRemove(imageId, (err, imageRemoved) => {
        if (err) {
            res.status(500).send({message: 'Error en la peticion'});
        }
        else {
            if (!imageRemoved) {
                res.status(404).send({message: 'No existe la imagen'});
            }
            else {
                res.status(200).send(image);
            }
        }
    });
}

function uploadImage(req, res) {
    var imageId = req.params.id;
    var fileName = 'No subido...';

    if (req.files) {
        var filePath = req.files.image.path;
        var fileSplit = filePath.split('\\');
        fileName = fileSplit[1];

        Image.findByIdAndUpdate(imageId, {picture: fileName}, (err, imageUpdated) => {
            if (err) {
                res.status(500).send({message: 'Error en la peticion'});
            }
            else {
                if (!imageUpdated) {
                    res.status(404).send({message: 'No existe la imagen'});
                }
                else {
                    res.status(200).send({image: imageUpdated});
                }
            }
        });
    }
    else {
        res.status(200).send({message: 'No ha subido ninguna imagen'});
    }
}

module.exports = {
    getImages,
    getImage,
    saveImage,
    updateImage,
    deleteImage,
    uploadImage
}