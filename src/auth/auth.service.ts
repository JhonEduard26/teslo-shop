import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.usersRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.usersRepository.save(user);
      delete user.password;

      return user;
      // TODO: return jwt token
    } catch (error) {
      console.log(error);
      if (error.code === '23505') throw new BadRequestException(error.detail);
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.usersRepository.findOne({
      where: { email },
      select: { email: true, password: true, isActive: true },
    });

    if (!user) throw new UnauthorizedException('Invalid email');

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid password');
    }

    console.log(user);

    if (!user.isActive) throw new UnauthorizedException('User is not active');

    const payload = { email: user.email };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
