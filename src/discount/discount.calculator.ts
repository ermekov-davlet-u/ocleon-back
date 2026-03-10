// discount/discount.calculator.ts

import { Discount, DiscountType } from './entities/discount.entity';

export interface DiscountResult {
  finalAmount: number;
  discountAmount: number; // сколько скинули
  label: string;          // описание для чека
}

export function applyDiscount(
  baseAmount: number,
  discount: Discount,
): DiscountResult {
  let finalAmount = baseAmount;
  let label = discount.name;

  switch (discount.type) {
    case DiscountType.PERCENT:
      // Пример: 15% от baseAmount
      const saved = (baseAmount * discount.value) / 100;
      finalAmount = baseAmount - saved;
      label = `${discount.name} (−${discount.value}%)`;
      break;

    case DiscountType.FIXED:
      // Пример: скидка 600 сом
      finalAmount = baseAmount - discount.value;
      label = `${discount.name} (−${discount.value} сом)`;
      break;

    case DiscountType.PRICE_OVERRIDE:
      // Пример: вторая оклейка = всегда 600 сом
      finalAmount = discount.value;
      label = `${discount.name} (цена = ${discount.value} сом)`;
      break;

    default:
      finalAmount = baseAmount;
  }

  if (finalAmount < 0) finalAmount = 0;

  return {
    finalAmount,
    discountAmount: baseAmount - finalAmount,
    label,
  };
}

export function isDiscountValid(discount: Discount): boolean {
  if (!discount.isActive) return false;
  const now = new Date();
  if (discount.startDate && discount.startDate > now) return false;
  if (discount.endDate && discount.endDate < now) return false;
  return true;
}
