import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  albums: any[] = [];
  isLoading: boolean = false;
  error: boolean = false;
  messageError: string = '';

  constructor(private http: HttpClient, private spotify: SpotifyService) {}

  ngOnInit(): void {}

  search(termino: any) {
    const TYPE: string = 'artist';
    const LIMIT: string = '20';

    this.isLoading = true;

    if (termino.trim('')) {
      this.spotify.getSearchArtistAlbum(termino, TYPE, LIMIT).subscribe(
        (response) => {
          this.isLoading = false;
          this.albums = response;
        },
        () => {
          this.error = true;
          this.isLoading = false;
          this.messageError = 'Error en el servicio.';
        }
      );
    } else {
      this.isLoading = false;
      this.error = false;
      return (this.albums = []);
    }
  }
}
