import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { PokedexApiService } from 'src/app/services/pokedex-api.service';
import { ILocalizedAbility } from 'src/app/services/pokemon';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.scss'],
})
export class AbilitiesComponent implements OnChanges {
  @Input() abilityNames?: string[];
  @Input() typeIconSrc?: string;

  abilities: ILocalizedAbility[];
  loading: boolean;

  constructor(private pokedexApiService: PokedexApiService) {
    this.abilities = [];
    this.loading = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loading = true;
    this.pokedexApiService.fetchAbilitiesLocalization(changes.abilityNames.currentValue)
      .subscribe((abilities: ILocalizedAbility[]) => {
        this.abilities = [...abilities];
        this.loading = false;
      });
  }
}
