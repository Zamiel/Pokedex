import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

import { AbilityComponent } from './ability.component';

describe('AbilityComponent', () => {
  let nativeElement: any;
  let component: AbilityComponent;
  let fixture: ComponentFixture<AbilityComponent>;

  const translateServiceStub = {
    get currentLang(): string {
      return 'fr';
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbilityComponent],
      providers: [
        {
          provide: TranslateService,
          useValue: translateServiceStub,
        },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbilityComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a localized description & name', async () => {
    component.name = { fr: 'nom' };
    component.description = { fr: 'description' };
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;

    const h4 = await nativeElement.querySelector('h4');
    const description = await nativeElement.querySelector('p');

    expect(h4.innerText).toEqual('nom');
    expect(description.innerText).toEqual('description');
  });
});
