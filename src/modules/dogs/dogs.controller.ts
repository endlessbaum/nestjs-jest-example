import { Controller, Get, Post } from '@nestjs/common';
import { DogsService } from './dogs.service';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Get('')
  async getDogs() {
    return await this.dogsService.getDogs();
  }
}
