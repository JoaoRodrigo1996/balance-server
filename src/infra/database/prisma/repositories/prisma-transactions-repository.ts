import { TransactionsRepository } from "@/domain/balance/application/repositories/transactions-repository";
import { Transaction } from "@/domain/balance/entities/transaction";
import { PrismaTransactionsMapper } from "../mappers/prisma-transaction-mapper";
import { prisma } from "../prisma";

export class PrismaTransactionsRepository implements TransactionsRepository {
  async create(transaction: Transaction) {
    const data = PrismaTransactionsMapper.toPrisma(transaction);

    await prisma.transaction.create({ data });
  }

  async findById(id: string) {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      return null;
    }

    return PrismaTransactionsMapper.toDomain(transaction);
  }

  async findMany(clientId: string, page: number): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: {
        client_id: clientId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return transactions.map(PrismaTransactionsMapper.toDomain);
  }

  async save(transaction: Transaction) {
    const data = PrismaTransactionsMapper.toPrisma(transaction);

    await prisma.transaction.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
}
