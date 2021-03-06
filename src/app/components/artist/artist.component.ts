import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
})
export class ArtistComponent implements OnInit {
  artist: any = {};
  isLoading: boolean;
  idArtist: string = '';
  tracks: any[] = [];

  constructor(private router: ActivatedRoute, private spotify: SpotifyService) {
    this.isLoading = true;
    this.router.params.subscribe((params) => this.idArtist = params.id);
    this.getArtistSpecific(this.idArtist);
    this.getTracksForArtist(this.idArtist);
  }

  ngOnInit(): void {}

  getArtistSpecific(id: string) {
    this.isLoading = true;
    this.spotify.getArtist(id).subscribe((response) => {
      this.isLoading = false;
      this.artist = response;
    });
  }

  getTracksForArtist(id : string){
    this.spotify.getTracksArtist(id).subscribe((response : any )=> this.tracks = response)
  }
}
