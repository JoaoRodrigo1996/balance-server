import { FetchManyTransactionsUseCase } from "@/domain/balance/application/use-cases/fetch-many-transactions";
import { PrismaTransactionsRepository } from "@/infra/database/prisma/repositories/prisma-transactions-repository";

export function makeFetchManyTransactionsUseCase() {
  const prismaTransactionsRepository = new PrismaTransactionsRepository();
  const useCase = new FetchManyTransactionsUseCase(
    prismaTransactionsRepository,
  );

  return useCase;
}
