import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.deleteTables();
    const adminUser = await this.insertUsers();

    await this.insertAllProducts(adminUser);

    return { message: 'seed executed' };
  }

  private async deleteTables() {
    await this.productsService.deleteAllProducts();

    const queryBuilder = this.usersRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach((user) => {
      users.push(this.usersRepository.create(user));
    });

    const dbUsers = await this.usersRepository.save(seedUsers);

    return dbUsers[0];
  }

  private async insertAllProducts(adminUser: User) {
    await this.productsService.deleteAllProducts();

    const seedProducts = initialData.products;

    const insertPromises = [];

    seedProducts.forEach((product) => {
      insertPromises.push(this.productsService.create(product, adminUser));
    });
    await Promise.all(insertPromises);
  }
}
