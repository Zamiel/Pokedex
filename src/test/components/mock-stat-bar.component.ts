import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-bar',
  template: '<div>{{ key }}:{{ current }}</div>',
})
export class MockStatBarComponent {
  @Input() current = 0;
  @Input() height = '1rem';
  @Input() key = 'hp';
}
