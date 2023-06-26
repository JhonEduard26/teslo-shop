import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    required: false,
    type: Number,
    default: 10,
    description: 'The number of items to return in the response.',
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    required: false,
    type: Number,
    default: 0,
    description:
      'The number of items to skip before starting to collect the result set.',
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}
