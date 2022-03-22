import { HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { CatsService } from './cats.service';
import { DogsService } from '../dogs/dogs.service';
import { CatsAndDocs } from './cats.type';
import { CatsModule } from './cats.module';
import dayjs from 'dayjs';
import MockDate from 'mockdate';

describe('catsService', () => {
  let catsService: CatsService;
  let httpService: HttpService;
  let dogsService: DogsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CatsModule],
    }).compile();

    catsService = app.get<CatsService>(CatsService);
    httpService = app.get<HttpService>(HttpService);
    dogsService = app.get<DogsService>(DogsService);
  });

  describe('normal', () => {
    it('should return "Hello World!"', () => {
      expect(catsService.getHello()).toBe('Hello World!');
    });
  });

  describe('stub', () => {
    it('should return "Hello World!"', () => {
      expect(catsService.getHelloStub()).toBe('Hello World! stub');
    });
  });

  describe('stub spyOn', () => {
    it('should return "Hello World!"', () => {
      jest
        .spyOn(catsService, 'stubfunc')
        .mockImplementation(() => 'this is stub');
      expect(catsService.getHelloStub()).toBe('this is stub');
    });
  });

  describe('Depends on Other Module', () => {
    it('should return dog and cats', () => {
      const dog_cats_list = {
        kajdafe: {
          id: 'kajdafe',
          name: 'さとうさん',
        },
        nlshfedk: {
          id: 'nlshfedk',
          name: 'すずきさん',
        },
        deokdfoe: {
          id: 'deokdfoe',
          name: 'タマ',
        },
        clwcebwe: {
          id: 'clwcebwe',
          name: 'クロ',
        },
      };
      expect(catsService.dogAndCats()).toEqual(dog_cats_list);
    });
  });
  describe('Depends on Other Module Spy On Other Module func ', () => {
    it('should return cats', () => {
      const cats_list: CatsAndDocs = {
        deokdfoe: {
          id: 'deokdfoe',
          name: 'タマ',
        },
        clwcebwe: {
          id: 'clwcebwe',
          name: 'クロ',
        },
      };
      jest.spyOn(dogsService, 'getDogs').mockImplementation(() => cats_list);
      expect(catsService.dogAndCats()).toEqual(
        Object.assign(cats_list, cats_list),
      );
    });
  });

  describe('Depends on HTTP Module Promise func ', () => {
    it('should return cats', () => {
      const cats_list = {
        deokdfoe: {
          id: 'deokdfoe',
          name: 'タマ',
        },
        clwcebwe: {
          id: 'clwcebwe',
          name: 'クロ',
        },
      };
      expect(
        catsService.httpTest().then((data) => {
          expect(data).toEqual(cats_list);
        }),
      );
    });
  });

  describe('Depends on HTTP Module Spy On HttpModule  Promise func ', () => {
    it('should return cats', () => {
      const cats_list = {
        deokdfoe: {
          id: 'deokdfoe',
          name: 'タマ',
        },
      };
      jest
        .spyOn(httpService, 'get')
        .mockImplementation((url, config) =>
          of({ data: cats_list } as AxiosResponse),
        );
      expect(
        catsService.httpTest().then((data) => {
          expect(data).toEqual(cats_list);
        }),
      );
    });
  });
  describe('dayjs', () => {
    it('should return now timestamp', () => {
      const now = dayjs().unix();
      console.log(now);
      expect(catsService.nowtimestamp()).toBe(now);
    });
  });
  describe('dayjs mockdate ', () => {
    it('should return mock timestamp', () => {
      MockDate.set('2022-03-22');
      const now = dayjs().unix();
      console.log(now);
      expect(catsService.nowtimestamp()).toBe(now);
    });
  });
});
