import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ToolbarComponent', () => {
  let nativeElement: any;
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      imports: [
        TranslateModule.forRoot({
          useDefaultLang: true,
          defaultLanguage: 'fr',
        })
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle language on click', () => {
    nativeElement.querySelector('button').click();
    fixture.detectChanges();

    expect(component.nextLang).toEqual('en');
  });
});
