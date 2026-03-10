import { Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity';
import { User } from 'src/users/entities/user.entity';
import { CuttingOrder } from 'src/order/entities/order.entity';
import { Client } from 'src/client/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Discount, Client, CuttingOrder])],
  controllers: [DiscountController],
  providers: [DiscountService],
})
export class DiscountModule {}
