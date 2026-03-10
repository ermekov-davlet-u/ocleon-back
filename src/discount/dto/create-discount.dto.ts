import { DiscountType } from '../entities/discount.entity';

export class CreateDiscountDto {
  name: string;
  type: DiscountType; // PERCENT | FIXED
  value: number;
  description?: string;

  clientId?: number; // если скидка клиенту
  startDate?: Date;
  endDate?: Date;

  isActive?: boolean;
}
