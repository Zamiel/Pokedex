import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  sfx = new Audio('assets/sfx/sealed-chest.wav');

  get nextLang(): string {
    return this.translate.currentLang === 'fr' ? 'en' : 'fr';
  }

  constructor(private translate: TranslateService) {
    this.sfx.load();
  }

  onLangClick(): void {
    this.translate.use(this.nextLang);
  }

  onSealedBoxClick(): void {
    this.sfx.pause();
    this.sfx.currentTime = 0;
    this.sfx.play();
  }
}
