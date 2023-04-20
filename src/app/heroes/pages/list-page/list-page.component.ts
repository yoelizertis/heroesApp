import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroes } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  public heroes:Heroes[]=[];
  constructor(private heroesService:HeroesService ){}

  ngOnInit(): void {
this.heroesService.getHeroes()
.subscribe(heroes =>this.heroes=heroes);
  }
}
