// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/entities/todo.entity';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArmortypesModule } from './armortypes/armortypes.module';
import { ArmorType } from './armortypes/entities/armortype.entity';
import { DevicetypeModule } from './devicetype/devicetype.module';
import { ClientsModule } from './client/client.module';
import { BranchesModule } from './branch/branch.module';
import { CuttingModule } from './order/order.module';
import { MaterialModule } from './material/material.module';
import { CuttingJobModule } from './cutting-job/cutting-job.module';
import { CuttingJob } from './cutting-job/entities/cutting-job.entity';
import { Branch } from './branch/entities/branch.entity';
import { DeviceType } from './devicetype/entities/devicetype.entity';
import { Material } from './material/entities/material.entity';
import { CuttingOrder } from './order/entities/order.entity';
import { Client } from './client/entities/client.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EmlpoyeeModule } from './emlpoyee/emlpoyee.module';
import { Employee } from './emlpoyee/entities/emlpoyee.entity';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoiceItemModule } from './invoice-item/invoice-item.module';
import { Invoice } from './invoice/entities/invoice.entity';
import { InvoiceItem } from './invoice-item/entities/invoice-item.entity';
import { DiscountModule } from './discount/discount.module';
import { PartnerModule } from './partner/partner.module';
import { MaterialListModule } from './material-list/material-list.module';
import { Discount } from './discount/entities/discount.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // папка с файлами
      serveRoot: '/uploads', // URL
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // ← ВОТ ЭТО ОБЯЗАТЕЛЬНО
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'ocleon',
      entities: [Todo, User, ArmorType, CuttingJob, Branch, DeviceType, Material, CuttingOrder, Client, Employee,
        Invoice, InvoiceItem, Discount
      ],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    TodosModule,
    AuthModule,
    ArmortypesModule,
    DevicetypeModule,
    ClientsModule,
    BranchesModule,
    CuttingModule,
    MaterialModule,
    CuttingJobModule,
    EmlpoyeeModule,
    InvoiceModule,
    InvoiceItemModule,
    DiscountModule,
    PartnerModule,
    MaterialListModule
  ],
})
export class AppModule {}
