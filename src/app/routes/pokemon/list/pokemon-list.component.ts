import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Form, FormControl } from '@angular/forms';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements AfterViewInit {
  searchFormControl: FormControl;

  constructor() {
    this.searchFormControl = new FormControl();
  }

  ngAfterViewInit(): void {
  }
}
