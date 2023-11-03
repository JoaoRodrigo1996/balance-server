import { InMemoryTransactionsRepository } from "test/repositories/in-memory-transactions-repository";
import { CreateTransactionUseCase } from "./create-transaction";

let inMemoryTransactionsRepository: InMemoryTransactionsRepository;
let sut: CreateTransactionUseCase;

describe("Create transaction", () => {
  beforeEach(() => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository();
    sut = new CreateTransactionUseCase(inMemoryTransactionsRepository);
  });

  it("should be able to create a new transaction", async () => {
    await sut.execute({
      clientId: "client-01",
      title: "Mobile app",
      amount: 1000,
      type: "INCOME",
    });

    expect(inMemoryTransactionsRepository.items[0].title).toEqual("Mobile app");
  });
});
