import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ImageService } from '../services/image.service';
import { Image } from '../models/image';

@Component({
    selector: 'image-edit',
    templateUrl: '../views/image-add.html',
    providers: [ ImageService ]
})

export class ImageEditComponent implements OnInit {
    public headerTitle: string;
    public image: Image;
    public errorMessage: any;
    public isEdit: boolean;

    constructor (
        private _route: ActivatedRoute,
        private _router: Router,
        private _imageService: ImageService
    ) {
        this.headerTitle = "Editar imagen";     
        this.isEdit = true;   
    }

    ngOnInit() {
        console.log("image-edit.component.ts loaded");
        this.image = new Image("","","");
        this.getImage();
    }

    getImage() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._imageService.getImage(id).subscribe(
                response => {
                    this.image = response.image;

                    if (!response.image) {
                        this._router.navigate(['/']);
                    }
                },
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                    }
                }
            )
        });
    }

    onSubmit() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._imageService.editImage(id, this.image).subscribe(
                response => {
                    this.image = response.image;

                    if (!response.image) {
                        alert("Error en el servidor");
                    }
                    else {
                        // Subir la imagen
                    }

                    this._router.navigate(['album/', this.image.album]);
                },
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                    }
                }
            );
        });
    }
}