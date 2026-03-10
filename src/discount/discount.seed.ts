// discount/discount.seed.ts

import { DataSource } from 'typeorm';
import { Discount, DiscountType, DiscountRule } from './entities/discount.entity';

export async function seedDiscounts(dataSource: DataSource) {
  const repo = dataSource.getRepository(Discount);

  const discounts = [
    {
      name: 'Вторая оклейка',
      rule: DiscountRule.SECOND_WRAPPING,
      type: DiscountType.PRICE_OVERRIDE, // итог = фикс. 600 сом
      value: 600,
      description: 'Повторная оклейка того же устройства — цена 600 сом',
      isActive: true,
    },
    {
      name: 'Привёл друга',
      rule: DiscountRule.REFERRAL,
      type: DiscountType.PERCENT,        // −15%
      value: 15,
      description: 'Клиент привёл нового клиента — скидка 15%',
      isActive: true,
    },
    {
      name: 'Второе устройство',
      rule: DiscountRule.SECOND_DEVICE,
      type: DiscountType.PERCENT,        // −20%
      value: 20,
      description: 'Оклейка второго устройства в одном визите — скидка 20%',
      isActive: true,
    },
  ];

  for (const data of discounts) {
    const exists = await repo.findOne({ where: { rule: data.rule } });
    if (!exists) {
      await repo.save(repo.create(data));
      console.log(`✅ Скидка "${data.name}" создана`);
    }
  }
}
