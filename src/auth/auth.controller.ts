// auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth') 
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('login')
async login(@Body() loginDto: LoginDto) {
  const user = await this.authService.validateUser(loginDto.email, loginDto.senha);

  if (!user) {
    throw new UnauthorizedException('Credenciais inválidas');
  }

  return this.authService.login(user);
}

}
