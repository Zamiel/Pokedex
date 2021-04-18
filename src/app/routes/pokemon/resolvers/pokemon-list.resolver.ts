import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { INameUrl } from 'src/app/services/pokemon';
import { PokedexApiService } from 'src/app/services/pokedex-api.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonListResolver implements Resolve<INameUrl[]> {
  constructor(private pokedexApi: PokedexApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INameUrl[]> {
    return this.pokedexApi.fetchFirstGeneration();
  }
}
