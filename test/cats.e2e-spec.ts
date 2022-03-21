import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CatsModule } from './../src/modules/cats/cats.module';

describe('CatsController (e2e)', () => {
  let cats: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CatsModule],
    }).compile();

    cats = moduleFixture.createNestApplication();
    await cats.init();
  });

  it('/ (GET)', () => {
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
    return request(cats.getHttpServer())
      .get('/cats')
      .expect(200)
      .expect(cats_list);
  });
});
