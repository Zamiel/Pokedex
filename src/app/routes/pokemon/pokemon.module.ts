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
    ListCardComponent,
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
