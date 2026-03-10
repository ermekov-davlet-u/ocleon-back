export class CreateCuttingOrderDto {
  cuttingJobId:  number;
  quantity:      number;
  clientPhone:   string;
  clientName?:   string;
  clientEmail?:  string;
  materialId?:   number;   // ← ОБЯЗАТЕЛЬНО должно быть!
  discountId?:   number;
  discountRule?: string;
  summa?:        number;
  notes?:        string;
}
