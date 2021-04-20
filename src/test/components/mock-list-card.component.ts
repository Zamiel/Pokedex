import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-card',
  template: '<span>{{ name }}</span>',
})
export class MockListCardComponent {
  @Input() name?: string;
}
