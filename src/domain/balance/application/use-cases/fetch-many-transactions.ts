import { Either, right } from "@/core/either";
import { Transaction } from "../../entities/transaction";
import { TransactionsRepository } from "../repositories/transactions-repository";

interface FetchManyTransactionsUseCaseRequest {
  clientId: string;
  page: number;
}

type FetchManyTransactionsUseCaseResponse = Either<
  null,
  {
    transactions: Transaction[];
  }
>;

export class FetchManyTransactionsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    clientId,
    page,
  }: FetchManyTransactionsUseCaseRequest): Promise<FetchManyTransactionsUseCaseResponse> {
    const transactions = await this.transactionsRepository.findMany(
      clientId,
      page,
    );

    return right({ transactions });
  }
}
