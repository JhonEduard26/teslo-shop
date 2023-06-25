import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductsModule } from '../products/products.module';
import { User } from '../auth/entities/user.entity';

@Module({
  imports: [ProductsModule, JwtModule, TypeOrmModule.forFeature([User])],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
