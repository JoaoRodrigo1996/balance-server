import { Transaction } from "../../entities/transaction";

export interface TransactionsRepository {
  create(transaction: Transaction): Promise<void>;
  findById(id: string): Promise<Transaction | null>;
  findMany(clientId: string, page: number): Promise<Transaction[]>;
  save(transaction: Transaction): Promise<void>;
}
