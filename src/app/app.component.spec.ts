import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';

import { MockToolbarComponent } from '../test/components/mock-toolbar.component';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const translateServiceStub = {
    set langs(value: string[]) {
    },
    getBrowserLang(): string {
      return 'fr';
    },
    setDefaultLang(value: string): void {
    },
    use(value: string): void {
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        AppComponent,
        MockToolbarComponent,
      ],
      providers: [
        { provide: TranslateService, useValue: translateServiceStub },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
