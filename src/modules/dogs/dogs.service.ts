import { Injectable } from '@nestjs/common';
import type { CatsAndDocs } from '../cats/cats.type';

const dogs: CatsAndDocs = {
  kajdafe: {
    id: 'kajdafe',
    name: 'さとうさん',
  },
  nlshfedk: {
    id: 'nlshfedk',
    name: 'すずきさん',
  },
};

@Injectable()
export class DogsService {
  getDogs(): CatsAndDocs {
    return dogs;
  }
}
