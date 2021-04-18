import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { INameUrl } from 'src/app/services/pokemon';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  filteredOptions: INameUrl[];
  searchFormControl: FormControl;

  private _options: INameUrl[];

  get isListEmpty(): boolean {
    return !this.filteredOptions || !this.filteredOptions.length;
  }

  get searchTooltip(): string {
    return this.translate.instant('LIST.TOOLTIP.SEARCH');
  }

  constructor(private router: Router, private route: ActivatedRoute, private translate: TranslateService) {
    this.searchFormControl = new FormControl(this.route.snapshot.queryParams.search);
    this.filteredOptions = [];
    this._options = [];
  }

  ngOnInit(): void {
    const { data } = this.route.snapshot;

    if (data && data.list) {
      this._options = data.list.concat();
    }

    this.filteredOptions = this._options.concat();
    this.listenSearchFormControl();
  }

  onDeleteClick(): void {
    this.searchFormControl.setValue('');
  }

  private listenSearchFormControl(): void {
    this.searchFormControl.valueChanges
      .pipe(
        debounceTime(250),
      )
      .subscribe(selectedValue => {
        if (!selectedValue) {
          this.router.navigate([], { relativeTo: this.route });
          this.filteredOptions = this._options.concat();
        } else {
          this.router.navigate([], {
            relativeTo: this.route, queryParams: { search: selectedValue },
          });
          this.filteredOptions = this._options.concat()
            .filter((option: INameUrl) => {
              return option.name.indexOf(selectedValue.toLowerCase()) >= 0;
            });
        }
      });
  }
}
