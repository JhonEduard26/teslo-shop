import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../interfaces/valid-roles.interface';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: ValidRoles[]) => SetMetadata(ROLES_KEY, roles);
