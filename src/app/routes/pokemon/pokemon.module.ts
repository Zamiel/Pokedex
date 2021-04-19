import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule, SharedModule } from 'src/app/modules';
import { PokemonDetailsComponent } from './details/pokemon-details.component';
import { PokemonListComponent } from './list/pokemon-list.component';
import { PokemonComponent } from './pokemon.component';
import { PokemonListResolver, PokemonDetailsResolver } from './resolvers';
import { FlexModule } from '@angular/flex-layout';
import { ListCardComponent } from './list/list-card/list-card.component';
import { StatBarComponent } from '../../components/stat-bar/stat-bar.component';
import { SpritesViewerComponent } from '../../components/sprites-viewer/sprites-viewer.component';
import { AbilitiesComponent } from './details/abilities/abilities.component';
import { AbilityComponent } from './details/abilities/ability/ability.component';

const routes: Routes = [
  {
    path: 'pokemon',
    component: PokemonComponent,
    children: [
      {
        path: '',
        component: PokemonListComponent,
        resolve: {
          list: PokemonListResolver,
        },
      },
      {
        path: ':pokemonId',
        component: PokemonDetailsComponent,
        resolve: {
          details: PokemonDetailsResolver,
        },
      },
    ],
  },
];

@NgModule({
  declarations: [
    AbilitiesComponent,
    AbilityComponent,
    ListCardComponent,
    StatBarComponent,
    SpritesViewerComponent,
    PokemonComponent,
    PokemonDetailsComponent,
    PokemonListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SharedModule,
    FlexModule,
  ],
  exports: [
    PokemonComponent,
    PokemonDetailsComponent,
    PokemonListComponent,
  ],
  providers: [
    PokemonDetailsResolver,
    PokemonListResolver,
  ],
})
export class PokemonModule {
}
