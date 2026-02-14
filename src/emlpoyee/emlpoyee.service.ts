import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/emlpoyee.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateEmployeeDto } from './dto/create-emlpoyee.dto';
import { UpdateEmlpoyeeDto } from './dto/update-emlpoyee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateEmployeeDto): Promise<Employee> {
    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existing = await this.employeeRepository.find({
      where: { user: { id: dto.userId } }
    });

    if (existing) {
      throw new ConflictException('Employee already exists for this user');
    }

    const employee = this.employeeRepository.create({
      ...dto,
      user,
    });

    return this.employeeRepository.save(employee);
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }

  async update(id: string, dto: UpdateEmlpoyeeDto): Promise<Employee> {
    const employee = await this.findOne(id);

    Object.assign(employee, dto);

    return this.employeeRepository.save(employee);
  }

  async remove(id: string): Promise<void> {
    const employee = await this.findOne(id);
    await this.employeeRepository.remove(employee);
  }
}
