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
    public title: string;
    public album: Album;
    public errorMessage: any;

    constructor (
        private _route: ActivatedRoute,
        private _router: Router,
        private _albumService: AlbumService
    ) {
        this.title = "Crear nuevo album";        
    }

    ngOnInit() {
        console.log("albums-add.component.ts loaded");
    }
}