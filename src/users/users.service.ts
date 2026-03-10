import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { IUser } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { userName: username },
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find({relations: {
      branch: true
    }});
  }

  async findOneById(userId: number): Promise<User | null> {
    return this.userRepo.findOneBy({ id: userId });
  }

  async createUser(body: IUser): Promise<User> {
    const branch: any = { id: body.branchId };
    return this.userRepo.save({
      userName: body.userName,
      password: body.password,
      isRole: body.isRole || 'USER',
      branch, // связь ManyToOne
    }as any);
  }

  async update(id: number, body: IUser) {
    const updateData: any = {
      userName: body.userName,
      password: body.password,
      isRole: body.isRole,
    };
  
    if (body.branchId) {
      updateData.branch = { id: body.branchId };
    }
  
    return this.userRepo.update(id, updateData as any);
  }

  async findByPayload({ username }: any): Promise<User | null> {
    return this.userRepo.findOne({
      where: { userName: username },
    });
  }

  async deleteUser(id: number) {
    return this.userRepo.delete(id);
  }
}
