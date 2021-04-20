import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-abilities',
  template: '<div></div>',
})
export class MockAbilitiesComponent {
  @Input() abilityNames?: string[];
  @Input() typeIconSrc?: string;
}
