import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, forkJoin, Observable } from 'rxjs';
import { retry, catchError, map, tap } from 'rxjs/operators';
import { ApiSettings } from '../config/app.config';
import { ILocalizedAbility, INameUrl, IPokemon, IPokemonList } from './pokemon';
import { REG_EXP_FIND_ID } from '../utils/regexp';
import { mapStatToPokemonStat } from 'src/app/config/pokemon.config';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class PokedexApiService {
  static VERSION_CONTROL = 'black-white';

  constructor(private http: HttpClient, private translate: TranslateService) {
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

  public fetchAbilitiesLocalization(abilityNames: string[]): Observable<ILocalizedAbility[]> {
    return forkJoin(abilityNames.map((name: string) => this.fetchAbilityLocalization(name)));
  }

  public fetchAbilityLocalization(abilityName: string): Observable<ILocalizedAbility> {
    return this.http.get<any>(`${ ApiSettings.API_URL }/ability/${ abilityName }`)
      .pipe(
        map((resp: any) => {
          const description: any = {};
          const name: any = {};

          if (resp) {
            resp.flavor_text_entries
              .filter((textEntry: any) => {
                const lang = textEntry.language.name  || null;
                const version = textEntry.version_group.name || null;

                return !!lang && !!version &&
                  version === PokedexApiService.VERSION_CONTROL && this.translate.langs.indexOf(lang) >= 0;
              })
              .forEach((textEntry: any) => {
                const lang = textEntry.language.name;
                description[lang] = textEntry.flavor_text;
              });

            resp.names
              .filter((n: any) => {
                const lang = n.language.name;
                return this.translate.langs.indexOf(lang) >= 0;
              })
              .forEach((n: any) => {
                const lang = n.language.name;
                name[lang] = n.name;
              });
          }

          return { description, name } as ILocalizedAbility;
        }),
      );
  }

  public fetchPokemonByName(name: string, reset = false): Observable<IPokemon> {
    return this.http.get<any>(this.getSpecificPokemonEndpoint(name))
      .pipe(
        map((resp: any) => {
          return (resp ? {
            id: resp.id,
            name: resp.name,
            abilities: resp ? resp.abilities.map(({ ability }: any) => ability.name) : [],
            sprites: {
              front_default: resp.sprites.front_default,
              front_shiny: resp.sprites.front_shiny,
            },
            stats: mapStatToPokemonStat(resp.stats),
            type: resp.types ? resp.types[0].type.name : 'normal',
          } : {}) as IPokemon;
        }),
        retry(ApiSettings.MAX_RETRY),
        catchError((err) => {
          console.error(err);
          return EMPTY;
        }),
      )
      ;
  }
}
