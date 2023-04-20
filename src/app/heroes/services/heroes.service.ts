import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { enviroments } from 'src/environments/environments';
import { Heroes } from '../interfaces/hero.interface';

@Injectable({providedIn: 'root'})
export class HeroesService {

    private baseUrl= enviroments.baseUrl;
    
    constructor(private httpClient: HttpClient) { }
    

    getHeroes():Observable<Heroes[]>{
        return this.httpClient.get<Heroes[]>(`${this.baseUrl}/heroes`);
    }

    getHeroById( id:string): Observable<Heroes|undefined>{
        return this.httpClient.get<Heroes>(`${ this.baseUrl}/heroes/${id}`)
        .pipe(
            catchError(error => of(undefined))
        );
    }
    getSuggestions(query: string): Observable<Heroes[]>{
        return this.httpClient.get<Heroes[]>(`${this.baseUrl}/heroes?q=${ query }&_limit=6`);
    }

    addHero( hero:Heroes):Observable<Heroes>{
        return this.httpClient.post<Heroes>(`${this.baseUrl}/heroes`,hero);
    }

    updateHero(hero:Heroes):Observable<Heroes>{
        if(!hero.id) throw Error('Hero id is required');
        
        return this.httpClient.patch<Heroes>(`${this.baseUrl}/heros/${hero.id}`,hero);
    }

    deleteHeroById(id:string):Observable<boolean>{

        return this.httpClient.delete(`${this.baseUrl}/heroes/${id}`)
        .pipe(
            map(resp =>true),
            catchError(err => of(false))
        );
    }
}