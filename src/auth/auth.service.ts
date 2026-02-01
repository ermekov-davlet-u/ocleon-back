import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/users/dto/create-user.dto';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(username: string, password: string): Promise<IUser | null> {
    try {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);
      console.log(username, hashedPassword);

      const result = await this.usersService.createUser({
        userName: username,
        password: hashedPassword,
      });
      return result;
    } catch (error) {
      return null;
    }
  }

  async validatorUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    if (!user) {
      return 'Нет такого пользователя';
    }

    const confirm = await bcrypt.compare(password, user.password);
    if (!confirm) {
      return null;
    }
    return {
      id: user.id,
      username: username,
      access_token: this.jwtService.sign({
        payload: username,
      }),
    };
  }

  async validateUser(payload: any): Promise<IUser> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
  async deleteUser(id: number): Promise<void> {
    this.usersService.deleteUser(id);
  }
}
