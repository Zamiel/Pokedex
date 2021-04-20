import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ability',
  template: '<span>{{ name }}{{ description }}</span>',
})
export class MockAbilityComponent {
  @Input() description?: { [lang: string]: string };
  @Input() name?: { [lang: string]: string };
}
