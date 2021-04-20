import { Component, Input } from '@angular/core';
import { ISprites } from '../../app/services/pokemon';

@Component({
  selector: 'app-sprites-viewer',
  template: '<div></div>',
})
export class MockSpritesViewerComponent {
  @Input() sprites?: ISprites;
}
