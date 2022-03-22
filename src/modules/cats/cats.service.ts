import { HttpService, Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { map } from 'rxjs/operators';
import { DogsService } from '../dogs/dogs.service';
import { CatsAndDocs } from './cats.type';

const cats = {
  deokdfoe: {
    id: 'deokdfoe',
    name: 'タマ',
  },
  clwcebwe: {
    id: 'clwcebwe',
    name: 'クロ',
  },
};

@Injectable()
export class CatsService {
  constructor(
    private dogsService: DogsService,
    private httpService: HttpService,
  ) {}
  findAll(): CatsAndDocs {
    return cats;
  }

  getHello(): string {
    return 'Hello World!';
  }

  getHelloStub(): string {
    return this.stubfunc();
  }

  stubfunc(): string {
    return 'Hello World! stub';
  }

  dogAndCats() {
    return Object.assign(this.dogsService.getDogs(), cats);
  }

  async httpTest(): Promise<CatsAndDocs> {
    const fetchedCats: CatsAndDocs = await this.httpService
      .get('http://localhost:3000/cats')
      .pipe(
        map((res) => {
          return res.data;
        }),
      )
      .toPromise();
    return fetchedCats;
  }

  nowtimestamp() {
    return dayjs().unix();
  }
}
