import { SetMetadata } from '@nestjs/common';

import { UserType } from '@shared/entities/user/usersType.enum';

export const Roles = (...roles: UserType[]) => SetMetadata('ROLES_KEY', roles);
