import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ImageService } from '../services/image.service';
import { Image } from '../models/image';

@Component({
    selector: 'image-add',
    templateUrl: '../views/image-add.html',
    providers: [ ImageService ]
})

export class ImageAddComponent implements OnInit {
    public headerTitle: string;
    public image: Image;
    public errorMessage: any;

    constructor (
        private _route: ActivatedRoute,
        private _router: Router,
        private _imageService: ImageService
    ) {
        this.headerTitle = "Crear nueva imagen";        
    }

    ngOnInit() {
        console.log("image-add.component.ts loaded");
        this.image = new Image("","","");
    }

    onSubmit() {
        this._imageService.addImage(this.image).subscribe(
            response => {
                this.image = response.image;

                if (!response.image) {
                    alert("Error en el servidor");
                }
                else {
                    // this._router.navigate(['/album', id]);
                }
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                }
            }
        );
    }
}