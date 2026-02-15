import { CuttingOrderStatus } from "../entities/order.entity";

// create-order.dto.ts
export class CreateCuttingOrderDto {
  cuttingJobId: number;
  quantity: number;
  clientPhone: string;
  clientName?: string;  // если создаём нового клиента
  clientEmail?: string;
}

// update-order.dto.ts
export class UpdateCuttingOrderDto {
  cuttingJobId?: number;
  quantity?: number;
  clientPhone?: string;
  clientName?: string;  // если создаём нового клиента
  clientEmail?: string;
  status?: CuttingOrderStatus
}
