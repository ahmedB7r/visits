//src/auth/auth.controller.ts

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
class LoginDto {
  @ApiProperty()
  userName: string;

  @ApiProperty()
  password: string;
}
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() { userName, password }: LoginDto) {
    return this.authService.login(userName, password);
  }
}
