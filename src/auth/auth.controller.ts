import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';

import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { Auth, GetRawHeaders, GetUser } from './decorators';
import { ValidRoles } from './interfaces/valid-roles.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @GetRawHeaders() rawHeaders: string[],
  ) {
    return { user, userEmail, rawHeaders };
  }

  @Get('private')
  @Auth(ValidRoles.admin)
  getPrivate(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }

  @Get('private2')
  @Auth(ValidRoles.user)
  getPrivate2(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }
}
