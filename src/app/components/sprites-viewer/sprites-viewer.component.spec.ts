import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpritesViewerComponent } from './sprites-viewer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { MatTabsModule } from '@angular/material/tabs';

describe('SpritesViewerComponent', () => {
  let component: SpritesViewerComponent;
  let fixture: ComponentFixture<SpritesViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SpritesViewerComponent,
      ],
      imports: [
        MatTabsModule,
        RouterTestingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({}),
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpritesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set correctly the getters for the sprites', async () => {
    component.sprites = { front_default: 'assets/icons/sealed-chest.png', front_shiny: 'assets/icons/sealed-chest.png' };
    fixture.detectChanges();

    expect(component.defaultSprite).toEqual('assets/icons/sealed-chest.png');
    expect(component.shinySprite).toEqual('assets/icons/sealed-chest.png');
  });
});
