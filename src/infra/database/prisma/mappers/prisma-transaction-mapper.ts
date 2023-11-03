import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Transaction } from "@/domain/balance/entities/transaction";
import { Prisma, Transaction as PrismaTransaction } from "@prisma/client";

export class PrismaTransactionsMapper {
  static toDomain(raw: PrismaTransaction) {
    return Transaction.create(
      {
        clientId: new UniqueEntityId(raw.client_id),
        title: raw.title,
        amount: raw.amount,
        type: raw.type,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(
    transaction: Transaction,
  ): Prisma.TransactionUncheckedCreateInput {
    return {
      client_id: transaction.clientId.toString(),
      id: transaction.id.toString(),
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      createdAt: transaction.createdAt,
    };
  }
}
