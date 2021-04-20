import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

import { PokedexApiService } from 'src/app/services/pokedex-api.service';
import { ILocalizedAbility } from 'src/app/services/pokemon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.scss'],
})
export class AbilitiesComponent implements OnDestroy, OnChanges {
  @Input() abilityNames?: string[];
  @Input() typeIconSrc?: string;

  abilities: ILocalizedAbility[];
  loading: boolean;

  private _abilitiesSubscription?: Subscription;

  constructor(private pokedexApiService: PokedexApiService) {
    this.abilities = [];
    this.loading = false;
  }

  ngOnDestroy(): void {
    if (this._abilitiesSubscription) {
      this._abilitiesSubscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loading = true;
    this._abilitiesSubscription = this.pokedexApiService.fetchAbilitiesLocalization(changes.abilityNames.currentValue)
      .subscribe((abilities: ILocalizedAbility[]) => {
        this.abilities = [...abilities];
        this.loading = false;
      });
  }
}
