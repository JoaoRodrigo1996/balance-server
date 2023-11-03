import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Transaction } from "../../entities/transaction";
import { TransactionsRepository } from "../repositories/transactions-repository";
import { Either, right } from "@/core/either";

interface CreateTransactionUseCaseRequest {
  clientId: string;
  title: string;
  amount: number;
  type: "INCOME" | "OUTCOME";
}

type CreateTransactionUseCaseResponse = Either<
  null,
  {
    transaction: Transaction;
  }
>;

export class CreateTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    clientId,
    title,
    amount,
    type,
  }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
    const transaction = Transaction.create({
      clientId: new UniqueEntityId(clientId),
      title,
      amount,
      type,
    });

    await this.transactionsRepository.create(transaction);

    return right({ transaction });
  }
}
