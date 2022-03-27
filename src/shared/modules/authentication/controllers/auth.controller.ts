import {
  Controller,
  Request,
  Post,
  Get,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '@shared/decorators/isPublic.decorator';
import { instanceToInstance } from 'class-transformer';

import { LoginRequestBodyDTO } from '@shared/dtos/authentication/LoginRequestBody.dto';
import { User } from '@shared/entities/user/user.entity';
import { AuthWithGoogleDTO } from '@shared/dtos/authentication/authWithGoogle.dto';

import { LocalAuthGuard } from '@shared/modules/authentication/guards/local-auth.guard';
import { AuthService } from '@shared/modules/authentication/services/Auth.service';
import { RefreshTokenAuthGuard } from '@shared/modules/authentication/guards/refresh-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google-auth')
  @Public()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  async googleAuth(
    @Body() authWithGoogleDTO: AuthWithGoogleDTO,
    @Request() req,
  ) {
    const response = await this.authService.authenticateWithGoogle(
      authWithGoogleDTO,
    );
    const { accessCookie, refreshCookie } = response;
    req.res.setHeader('Set-Cookie', [accessCookie, refreshCookie]);
    return instanceToInstance(response.user);
  }

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  async login(
    @Body() loginRequestBodyDTO: LoginRequestBodyDTO,
    @Request() req,
  ) {
    const response = await this.authService.login(req.user);
    const { accessCookie, refreshCookie } = response;
    req.res.setHeader('Set-Cookie', [accessCookie, refreshCookie]);
    return instanceToInstance(response.user);
  }

  @UseGuards(RefreshTokenAuthGuard)
  @Public()
  @Get('refresh')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Unauthorized',
  })
  async refresh(@Request() req) {
    const { user, accessCookie } = await this.authService.refresh(req.user);
    req.res.setHeader('Set-Cookie', accessCookie);
    return instanceToInstance(user);
  }

  @Get('logout')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'not logged in',
  })
  async logout(@Request() req) {
    const user = await this.authService.removeTokensFromUser(req.user.id);
    const logoutCookies = this.authService.logout();
    req.res.setHeader('Set-Cookie', logoutCookies);
    return instanceToInstance(user);
  }
}
