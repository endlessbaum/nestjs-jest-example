import { Controller, Get, Post } from '@nestjs/common';
import { CatsAndDocs } from './cats.type';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(): CatsAndDocs {
    return this.catsService.findAll();
  }

  @Get('/http')
  async getCats(): Promise<CatsAndDocs> {
    return await this.catsService.httpTest();
  }

  @Get('dog')
  getDogAndCats() {
    return this.catsService.dogAndCats();
  }
}
