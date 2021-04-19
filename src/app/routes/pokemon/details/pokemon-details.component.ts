import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPokemon, IPokemonStats } from '../../../services/pokemon';
import { getStatByKey } from '../../../config/pokemon.config';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  details?: IPokemon;

  get statKeys(): string[] {
    return this.details ? Object.keys(this.details.stats) : [];
  }

  get stats(): IPokemonStats {
    return this.details ? this.details.stats : {} as IPokemonStats;
  }

  get typeIcon(): string {
    return this.details ? `assets/icons/pokemon-type/${ this.details.type }.png` : '';
  }

  constructor(private route: ActivatedRoute) {
    this.details = undefined;
  }

  ngOnInit(): void {
    const { data } = this.route.snapshot;

    if (data && data.details) {
      this.details = data.details;
    }
  }

  getLabelId(key: string): string {
    return `ENUMS.STATS.${ key.toUpperCase() }`;
  }

  getStatByKey(key: string): number {
    return getStatByKey(this.stats, key);
  }
}
