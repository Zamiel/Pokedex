import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PokedexApiService } from 'src/app/services/pokedex-api.service';
import { IPokemon } from 'src/app/services/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonDetailsResolver implements Resolve<IPokemon> {
  constructor(private pokedexApi: PokedexApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPokemon> {
    return this.pokedexApi.fetchPokemonByName(route.params.pokemonId);
  }
}
