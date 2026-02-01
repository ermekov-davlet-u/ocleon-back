// create-order.dto.ts
export class CreateCuttingOrderDto {
  cuttingJobId: number;
  quantity?: number;
}

// update-order.dto.ts
export class UpdateCuttingOrderDto {
  cuttingJobId?: number;
  quantity?: number;
}
