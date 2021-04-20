import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatBarComponent } from './stat-bar.component';
import * as pokemonConfig from '../../config/pokemon.config';

describe('StatBarComponent', () => {
  let nativeElement: any;
  let component: StatBarComponent;
  let fixture: ComponentFixture<StatBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatBarComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatBarComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find 10 separator', async () => {
    const list = await nativeElement.querySelectorAll('.separator');
    fixture.detectChanges();

    expect(list.length).toEqual(10);
  });

  it('should set style correctly', async () => {
    pokemonConfig.FIRST_GENERATION_POKEMON_MAX_STATS.hp = 10;
    component.current = 5;
    component.key = 'hp';
    fixture.detectChanges();

    expect(component.ratioStyle).toEqual({ backgroundColor: 'yellow', width: '50%' });
    expect(component.statBarStyle).toEqual({ height: '1rem' });
  });
});

