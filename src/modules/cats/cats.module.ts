import { HttpModule, Module } from '@nestjs/common';
import { DogsModule } from '../dogs/dogs.module';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  imports: [DogsModule, HttpModule],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
