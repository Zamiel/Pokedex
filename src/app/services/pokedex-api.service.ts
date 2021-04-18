import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { ApiSettings } from '../config/app.config';
import { INameUrl, IPokemon, IPokemonList } from './pokemon';
import { REG_EXP_FIND_ID, REG_EXP_FIND_ID_ON_URL } from '../utils/regexp';

@Injectable({
  providedIn: 'root',
})
export class PokedexApiService {
  constructor(private http: HttpClient) {
  }

  private getSpecificPokemonEndpoint(arg: string): string {
    REG_EXP_FIND_ID.lastIndex = 0;
    return `${ ApiSettings.API_URL }${ ApiSettings.POKEMON_ENDPOINT.replace(REG_EXP_FIND_ID, arg) }`;
  }

  public fetchByUrl(url: string): Observable<IPokemon> {
    return this.http.get<IPokemon>(url)
      .pipe(
        retry(ApiSettings.MAX_RETRY),
        catchError((err) => {
          console.error(err);
          return EMPTY;
        }),
      );
  }

  public fetchFirstGeneration(): Observable<INameUrl[]> {
    return this.http.get<IPokemonList>(`${ ApiSettings.API_URL }/generation/1`)
      .pipe(
        map((resp: IPokemonList) => {
          return (resp.pokemon_species || []);
        }),
        retry(ApiSettings.MAX_RETRY),
        catchError((err) => {
          console.error(err);
          return EMPTY;
        }),
      );
  }

  public fetchPokemonByAbility(ability: string, limit: number, offset: number): Observable<any> {
    return this.http.get(ApiSettings.API_URL);
  }

  public fetchPokemonById(id: number): Observable<IPokemon> {
    return this.http.get<IPokemon>(this.getSpecificPokemonEndpoint(id.toFixed(0)))
      .pipe(
        retry(ApiSettings.MAX_RETRY),
        catchError((err) => {
          console.error(err);
          return EMPTY;
        }),
      );
  }

  public fetchPokemonByName(name: string): Observable<IPokemon> {
    return this.http.get<IPokemon>(this.getSpecificPokemonEndpoint(name))
      .pipe(
        retry(ApiSettings.MAX_RETRY),
        catchError((err) => {
          console.error(err);
          return EMPTY;
        }),
      );
  }

  public fetchPokemons(query: string, limit: number, offset: number): Observable<IPokemon[]> {
    return new Observable<Array<IPokemon>>();
  }
}
