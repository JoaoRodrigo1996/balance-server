import { faker } from "@faker-js/faker";

import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  Transaction,
  TransactionProps,
} from "@/domain/balance/entities/transaction";

export function makeTransaction(
  override: Partial<TransactionProps> = {},
  id?: UniqueEntityId,
) {
  const transaction = Transaction.create(
    {
      clientId: new UniqueEntityId(),
      title: faker.lorem.sentence(),
      amount: Number(faker.finance.amount(5, 10, 2, "BR", true)),
      type: "INCOME",
      ...override,
    },
    id,
  );

  return transaction;
}
