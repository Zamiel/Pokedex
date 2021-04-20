import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';

import { MaterialModule, SharedModule } from 'src/app/modules';
import { PokemonDetailsComponent } from './details/pokemon-details.component';
import { PokemonListComponent } from './list/pokemon-list.component';
import { PokemonComponent } from './pokemon.component';
import { PokemonListResolver, PokemonDetailsResolver } from './resolvers';
import { SpritesViewerComponent } from '../../components/sprites-viewer/sprites-viewer.component';
import { StatBarComponent } from '../../components/stat-bar/stat-bar.component';
import { ListCardComponent } from './list/list-card/list-card.component';
import { AbilitiesComponent } from './details/abilities/abilities.component';
import { AbilityComponent } from './details/abilities/ability/ability.component';
import { PokemonRoutingModule } from './pokemon-routing.module';

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
    PokemonRoutingModule,
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
