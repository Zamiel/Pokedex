import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pokedex';

  constructor(private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.initTranslate();
  }

  private initTranslate(): void {
    const lang = this.translate.getBrowserLang();
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }
}
