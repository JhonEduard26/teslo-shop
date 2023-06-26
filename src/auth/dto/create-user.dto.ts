import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'myemail@mail.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    minimum: 8,
    maximum: 40,
    description:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(40)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  @MinLength(2)
  fullName: string;
}
