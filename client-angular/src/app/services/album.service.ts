import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Album } from '../models/album';
import { GLOBAL } from './global';

@Injectable()
export class AlbumService {
    public url: string;

    constructor (private _http: Http) {
        this.url = GLOBAL.url;
    }

    getAlbums() {
        return this._http.get(this.url + 'albums')
                        .map(res => res.json());
    }

    addAlbum(album: Album) {
        let json = JSON.stringify(album);
        let params = json;
        let headers = new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.url + 'album', params, {headers: headers})
                        .map(res => res.json());
    }
}