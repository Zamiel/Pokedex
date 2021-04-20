import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnDestroy {
  canGoBack = false;
  isLoading = false;
  name = '';

  private _routerSubscription?: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this._routerSubscription = this.router.events
      .pipe(
        tap((event) => this.setIsLoading(event)),
        filter((event) => event instanceof NavigationEnd),
        map(() => this.getFirstChild()),
        filter((route: ActivatedRoute) => route.outlet === 'primary'),
      )
      .subscribe((route: ActivatedRoute) => {
        this.name = route.snapshot.paramMap.get('pokemonId') || '';
        this.canGoBack = !!this.name;
      });
  }

  ngOnDestroy(): void {
    if (this._routerSubscription) {
      this._routerSubscription.unsubscribe();
    }
  }

  private getFirstChild(): ActivatedRoute {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  private setIsLoading(event: any): void {
    if (event instanceof NavigationStart) {
      this.isLoading = true;
    } else if (event instanceof NavigationEnd) {
      this.isLoading = false;
    }
  }
}
