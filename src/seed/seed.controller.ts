import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Public } from '../auth/decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @Public()
  runSeed() {
    return this.seedService.runSeed();
  }
}
