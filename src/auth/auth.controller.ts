import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body('password') password: string,
    @Body('userName') username: string,
  ) {
    return this.authService.login(username, password);
  }

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.validatorUser(username, password);
    console.log(user);

    if (user) {
      return 'Такой польователь уже существует';
    }
    return this.authService.createUser(username, password);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    this.authService.deleteUser(id);
  }
}
