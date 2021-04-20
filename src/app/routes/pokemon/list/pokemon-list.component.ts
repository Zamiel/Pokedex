import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime } from 'rxjs/operators';

import { INameUrl } from 'src/app/services/pokemon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit, OnDestroy {
  filteredOptions: INameUrl[];
  searchFormControl: FormControl;

  private _formControlSubscription?: Subscription;
  private _options: INameUrl[];

  get isListEmpty(): boolean {
    return !this.filteredOptions || !this.filteredOptions.length;
  }

  get searchTooltip(): string {
    return this.translate.instant('LIST.TOOLTIP.SEARCH');
  }

  constructor(private router: Router, private route: ActivatedRoute, private translate: TranslateService) {
    this.searchFormControl = new FormControl();
    this.filteredOptions = [];
    this._options = [];
  }

  ngOnInit(): void {
    const { data, queryParams } = this.route.snapshot;

    if (data && data.list) {
      this._options = data.list.concat();
    }

    const { search } = queryParams || {};
    if (!search) {
      this.filteredOptions = this._options.concat();
    }

    this.listenSearchFormControl(search);
  }

  ngOnDestroy(): void {
    if (this._formControlSubscription) {
      this._formControlSubscription.unsubscribe();
    }
  }

  onDeleteClick(): void {
    this.searchFormControl.setValue('');
  }

  private listenSearchFormControl(initialSearch: string): void {
    this._formControlSubscription = this.searchFormControl.valueChanges
      .pipe(
        debounceTime(250),
      )
      .subscribe(selectedValue => {
        if (!selectedValue) {
          this.router.navigate([], { relativeTo: this.route });
          this.filteredOptions = this._options.concat();
        } else {
          this.router.navigate([], {
            relativeTo: this.route, queryParams: { search: selectedValue.toLowerCase() },
          });
          this.filteredOptions = this._options.concat()
            .filter((option: INameUrl) => {
              return option.name.indexOf(selectedValue.toLowerCase()) >= 0;
            });
        }
      });

    if (initialSearch) {
      this.searchFormControl.setValue(initialSearch);
    }
  }
}
