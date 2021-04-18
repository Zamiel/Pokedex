import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PokedexApiService } from './services/pokedex-api.service';
import { INameUrl, IPokemon } from './services/pokemon';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'pokedex';
  autoComplete$: Observable<INameUrl[]>;
  pokemon$: Observable<IPokemon>;
  myControl = new FormControl('');

  constructor(private translate: TranslateService, private pokedexApiService: PokedexApiService) {
    this.initTranslate();

    this.autoComplete$ = EMPTY;
    this.pokemon$ = EMPTY;
  }

  ngOnInit(): void {
    this.autoComplete$ = this.pokedexApiService.fetchFirstGeneration();
    this.pokemon$ = this.pokedexApiService.fetchPokemonById(1)
      .pipe(
        tap((a) => console.dir(a)),
      );
    // console.dir(this.pokemon$);
  }

  private initTranslate(): void {
    const lang = this.translate.getBrowserLang();
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }

  test(): void {
    const id = Math.round(Math.random() * 151);
    console.log('id :: ' + id);
    this.pokemon$ = this.pokedexApiService.fetchPokemonById(id)
      .pipe(
        tap((a) => console.dir(a)),
      );
  }
}
