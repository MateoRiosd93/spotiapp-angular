import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() items: any[] = [];

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  getArtist(item : any){
    
    let idArtist : string = '';

    if(item.type === "artist"){
      idArtist = item.id
    }else{
      idArtist = item.artists[0].id
    }

    this.router.navigate(['/artist', idArtist]);
  }

}
