import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';

import { PokedexApiService } from 'src/app/services/pokedex-api.service';
import { IPokemon } from 'src/app/services/pokemon';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent implements OnChanges {
  @Input() name: string;
  pokemon$: Observable<IPokemon>;

  constructor(private pokedexApiService: PokedexApiService) {
    this.name = '';
    this.pokemon$ = EMPTY;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const name = changes.name.currentValue;
    if (name) {
      this.pokemon$ = this.pokedexApiService.fetchPokemonByName(name);
    } else {
      this.pokemon$ = EMPTY;
    }
  }

  getImgUrl(pokemon: IPokemon): string {
    return `assets/icons/pokemon-type/${ pokemon.types[0].type.name }.png`;
  }
}
