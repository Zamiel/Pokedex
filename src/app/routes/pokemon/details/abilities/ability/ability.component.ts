import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ability',
  templateUrl: './ability.component.html',
  styleUrls: ['./ability.component.scss'],
})
export class AbilityComponent {
  @Input() description: { [lang: string]: string };
  @Input() name: { [lang: string]: string };

  get lang(): string {
    return this.translate.currentLang;
  }

  constructor(private translate: TranslateService) {
    this.description = {};
    this.name = {};
  }
}
