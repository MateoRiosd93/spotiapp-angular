import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  albums: any[] = [];
  isLoading: boolean = true; 
  error: boolean = false;
  messageError : string = '';

  constructor(private spotify: SpotifyService) {
    setTimeout(() => {
      this.spotify.getNewReleases().subscribe(
        (response) => {
          this.albums = response;
          this.error = false;
          this.isLoading = false;
        },
        () => {
          this.error = true;
          this.isLoading = false;
          this.messageError = 'Error en el servicio.'
        }
      );
    }, 1000);
  }

  ngOnInit(): void {}
}
