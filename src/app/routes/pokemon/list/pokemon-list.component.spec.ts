import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FlexModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PokemonListComponent } from './pokemon-list.component';
import { MockListCardComponent } from '../../../../test/components/mock-list-card.component';
import { MaterialModule, SharedModule } from '../../../modules';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let nativeElement: any;
  let router: Router;
  const route = {
    url: 'pokemon',
    snapshot: {
      data: { list: [] },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MockListCardComponent,
        PokemonListComponent,
      ],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexModule,
        TranslateModule.forRoot({}),
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: route,
        },
      ],
    })
      .compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate on control change', fakeAsync(async () => {
    const spyNavigate = spyOn(router, 'navigate');
    component.searchFormControl.setValue('test');
    await tick(300);
    fixture.detectChanges();

    expect(spyNavigate).toHaveBeenCalledOnceWith(
      [],
      {
        relativeTo: Object({ url: 'pokemon', snapshot: { data: { list: [] } } }),
        queryParams: { search: 'test' },
      },
    );
  }));

  it('should navigate on delete clicked', fakeAsync(async () => {
    const spyNavigate = spyOn(router, 'navigate');
    nativeElement.querySelector('button').click();
    await tick(300);
    fixture.detectChanges();

    expect(spyNavigate).toHaveBeenCalledOnceWith(
      [],
      {
        relativeTo: Object({ url: 'pokemon', snapshot: { data: { list: [] } } }),
      },
    );
  }));
});
