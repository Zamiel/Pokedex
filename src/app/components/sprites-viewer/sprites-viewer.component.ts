import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ISprites } from '../../services/pokemon';

@Component({
  selector: 'app-sprites-viewer',
  templateUrl: './sprites-viewer.component.html',
  styleUrls: ['./sprites-viewer.component.scss'],
})
export class SpritesViewerComponent {
  @Input() sprites?: ISprites;

  get defaultLabel(): string {
    return this.translate.instant('DETAILS.SPRITES.DEFAULT');
  }

  get defaultSprite(): string {
    return this.sprites ? this.sprites.front_default : '';
  }

  get shinyLabel(): string {
    return this.translate.instant('DETAILS.SPRITES.SHINY');
  }

  get shinySprite(): string {
    return this.sprites ? this.sprites.front_shiny : '';
  }

  constructor(private translate: TranslateService) {
  }
}
