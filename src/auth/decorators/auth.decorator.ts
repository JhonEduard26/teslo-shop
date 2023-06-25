import { UseGuards, applyDecorators } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { AuthGuard, RolesGuard } from '../guards';
import { ValidRoles } from '../interfaces/valid-roles.interface';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));
}
