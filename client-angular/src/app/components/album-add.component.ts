import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';

@Component({
    selector: 'album-add',
    templateUrl: '../views/album-add.html',
    providers: [ AlbumService ]
})

export class AlbumAddComponent implements OnInit {
    public headerTitle: string;
    public album: Album;
    public errorMessage: any;

    constructor (
        private _route: ActivatedRoute,
        private _router: Router,
        private _albumService: AlbumService
    ) {
        this.headerTitle = "Crear nuevo album";        
    }

    ngOnInit() {
        console.log("albums-add.component.ts loaded");
        this.album = new Album("","");
    }

    onSubmit() {
        this._albumService.addAlbum(this.album).subscribe(
            response => {
                this.album = response.album;

                if (!response.album) {
                    alert("Error en el servidor");
                }
                else {
                    this._router.navigate(['/']);
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