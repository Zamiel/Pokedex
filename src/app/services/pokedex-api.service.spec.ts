import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

import { PokedexApiService } from './pokedex-api.service';
import { ApiSettings } from '../config/app.config';
import { MOCK_POKEMON_ABILITY } from '../../test/responses/mock-ability';
import { ILocalizedAbility, IPokemon } from './pokemon';
import { MOCK_FIRST_GENERATION } from '../../test/responses/mock-generation';
import { MOCK_BULBASAUR, MOCK_MAPPED_BULBASAUR } from '../../test/responses/mock-pokemon-by-name';

describe('PokedexApiService', () => {
  let httpTestingController: HttpTestingController;
  let service: PokedexApiService;
  ApiSettings.MAX_RETRY = 0;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: TranslateService,
          useValue: {
            get langs(): string[] {
              return ['fr', 'en'];
            },
          },
        },
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PokedexApiService);
  });

  it('should fetch abilities localization with success', () => {
    const ability = {
      name: { fr: 'Puanteur', en: 'Stench' },
      description: {
        fr: 'La puanteur peut\neffrayer l’adversaire.',
        en: 'The stench may cause\nthe target to flinch.',
      },
    };

    const result = [ability, ability, ability] as ILocalizedAbility[];
    service.fetchAbilitiesLocalization(['test', 'test', 'test'])
      .subscribe(
        data => {
          expect(data).toEqual(result);
        },
        (error: HttpErrorResponse) => {
          fail(error);
        },
      );

    const reqs = httpTestingController.match({ url: (ApiSettings.API_URL + '/ability/test'), method: 'get' });
    reqs.forEach((req: TestRequest) => {
      req.flush(MOCK_POKEMON_ABILITY);
    });
  });

  it('should fetch abilities localization with error', fakeAsync(async () => {
    service.fetchAbilitiesLocalization(['test'])
      .subscribe(
        () => fail('Should have failed with 404 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404);
        },
      );

    httpTestingController.expectOne((ApiSettings.API_URL + '/ability/test')).flush(
      null, { status: 404, statusText: 'Bad Request' },
    );
  }));

  it('should fetch ability localization with success', () => {
    const ability = {
      name: { fr: 'Puanteur', en: 'Stench' },
      description: {
        fr: 'La puanteur peut\neffrayer l’adversaire.',
        en: 'The stench may cause\nthe target to flinch.',
      },
    } as ILocalizedAbility;

    service.fetchAbilityLocalization('test')
      .subscribe(
        data => {
          expect(data).toEqual(ability);
        },
        (error: HttpErrorResponse) => {
          fail(error);
        },
      );

    const reqs = httpTestingController.match({ url: (ApiSettings.API_URL + '/ability/test'), method: 'get' });
    reqs.forEach((req: TestRequest) => {
      req.flush(MOCK_POKEMON_ABILITY);
    });
  });

  it('should fetch ability localization with error', () => {
    service.fetchAbilityLocalization('test')
      .subscribe(
        () => fail('Should have failed with 404 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404);
        },
      );

    httpTestingController.expectOne((ApiSettings.API_URL + '/ability/test')).flush(
      null, { status: 404, statusText: 'Bad Request' },
    );
  });

  it('should fetch first generation with success', () => {
    service.fetchFirstGeneration()
      .subscribe(
        data => {
          expect(data.length).toEqual(151);
        },
        (error: HttpErrorResponse) => {
          fail(error);
        },
      );

    httpTestingController.expectOne((ApiSettings.API_URL + '/generation/1')).flush(
      MOCK_FIRST_GENERATION,
    );
  });

  it('should fetch first generation with error', () => {
    service.fetchFirstGeneration()
      .subscribe(
        () => fail('Should have failed with 404 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404);
        },
      );

    httpTestingController.expectOne((ApiSettings.API_URL + '/generation/1')).flush(
      null, { status: 404, statusText: 'Bad Request' },
    );
  });

  it('should fetch pokemon by name with success', () => {
    service.fetchPokemonByName(MOCK_BULBASAUR.name)
      .subscribe(
        data => expect(data).toEqual(MOCK_MAPPED_BULBASAUR as IPokemon),
        (error: HttpErrorResponse) => {
          fail(error);
        },
      );

    httpTestingController.expectOne((ApiSettings.API_URL + '/pokemon/' + MOCK_BULBASAUR.name)).flush(
      MOCK_BULBASAUR,
    );
  });

  it('should fetch pokemon by name with error', () => {
    service.fetchPokemonByName(MOCK_BULBASAUR.name)
      .subscribe(
        () => fail('Should have failed with 404 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404);
        },
      );

    httpTestingController.expectOne((ApiSettings.API_URL + '/pokemon/' + MOCK_BULBASAUR.name)).flush(
      null, { status: 404, statusText: 'Bad Request' },
    );
  });
});
