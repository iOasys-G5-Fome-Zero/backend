import { Module } from '@nestjs/common';
import { RoleGuard } from '@shared/modules/authorization/guards/role.guard';

@Module({
  providers: [{ provide: 'APP_GUARD', useClass: RoleGuard }],
})
export class AuthorizationModule {}
