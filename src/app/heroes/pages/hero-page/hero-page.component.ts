import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroes } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css']
})
export class HeroPageComponent implements OnInit {  

  public hero?:Heroes;

  constructor(
    private heroesServices: HeroesService,
    private activatedRoute:ActivatedRoute,
    private router: Router 
  ){}

  ngOnInit(): void {
this.activatedRoute.params
  .pipe(
    switchMap( ({id})=> this.heroesServices.getHeroById(id)),
  )
  .subscribe(hero => {

    if (!hero) return this.router.navigate(['/heroes/list']);

    this.hero= hero;
    return;
  })

  }
  goBack():void{
    this.router.navigateByUrl('heroes/list');
  }
}

