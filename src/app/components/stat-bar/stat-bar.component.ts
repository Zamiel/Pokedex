import { Component, Input, OnInit } from '@angular/core';
import { getMaxStatByKey } from '../../config/pokemon.config';

interface IStyle {
  width: string;
  backgroundColor: string;
}

@Component({
  selector: 'app-stat-bar',
  templateUrl: './stat-bar.component.html',
  styleUrls: ['./stat-bar.component.scss'],
})
export class StatBarComponent {
  @Input() current = 0;
  @Input() height = '1rem';
  @Input() key = 'hp';

  private _separatorCount = 10;

  get max(): number {
    return getMaxStatByKey(this.key) || 1;
  }

  get ratioStyle(): IStyle {
    const ratio = this.current / this.max;
    return { backgroundColor: this.getBackgroundColor(ratio), width: `${ Math.floor((ratio * 100)) }%` };
  }

  get separators(): number[] {
    return Array.from({ length: this._separatorCount }, (v, i) => i);
  }

  get statBarStyle(): { height: string } {
    return { height: `${ this.height }` };
  }

  constructor() {
  }

  private getBackgroundColor(ratio: number): string {
    if (ratio >= 0.75) {
      return 'green';
    }

    if (ratio >= 0.5) {
      return 'yellow';
    }

    if (ratio >= 0.25) {
      return 'orange';
    }

    return 'red';
  }
}
