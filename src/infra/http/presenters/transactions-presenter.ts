import { Transaction } from "@/domain/balance/entities/transaction";

export class TransactionPresenter {
  static toHTTP(transaction: Transaction) {
    return {
      id: transaction.id.toString(),
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      createdAt: transaction.createdAt,
    };
  }
}
