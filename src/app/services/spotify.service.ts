import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {

  token : string = '';

  constructor(private http: HttpClient) {
    this.getToken().subscribe((response: any) => this.token = response.access_token);
  }

  getToken = () => {
    let client_id = "2925dd13bb1e4b4aab197ca2ffb4595f";
    let client_secret = "93a0ee1b66b34cfb96e3f3827ca6ae48";

    return this.http.get(`https://spotify-get-token.herokuapp.com/spotify/${client_id}/${client_secret}`);
  }

  getQuery(query: string) {
    let url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get(url, { headers });
  }

  getNewReleases = () => {
    let query = 'browse/new-releases?limit=20';
    return this.getQuery(query).pipe(
      map((response) => response['albums'].items)
    );
  };

  getSearchArtistAlbum = (parametro: string, type: string, litmit: string) => {
    let query = `search?q=${parametro}&type=${type}&limit=${litmit}`;

    return this.getQuery(query).pipe(
      map((response) => response['artists'].items)
    );
  };

  getArtist = (id : string) => {
    let query = `artists/${id}`;
    
    return this.getQuery(query);
  }

  getTracksArtist = (id: string) => {
    let query = `artists/${id}/top-tracks?market=es`;

    return this.getQuery(query).pipe(map((response : any ) => response.tracks));
  }
}
