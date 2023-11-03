import { CreateTransactionUseCase } from "@/domain/balance/application/use-cases/create-transaction";
import { PrismaTransactionsRepository } from "@/infra/database/prisma/repositories/prisma-transactions-repository";

export function makeTransactionUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository();

  const useCase = new CreateTransactionUseCase(transactionsRepository);

  return useCase;
}
