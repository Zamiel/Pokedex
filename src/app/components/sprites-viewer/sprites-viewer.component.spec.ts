import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpritesViewerComponent } from './sprites-viewer.component';

describe('SpritesViewerComponent', () => {
  let component: SpritesViewerComponent;
  let fixture: ComponentFixture<SpritesViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpritesViewerComponent ]
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
});
