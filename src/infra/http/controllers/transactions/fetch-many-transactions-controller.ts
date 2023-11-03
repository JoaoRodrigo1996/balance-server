import { FastifyRequest } from "fastify";
import { makeFetchManyTransactionsUseCase } from "../../factories/make-fetch-many-transactions-use-case";
import { TransactionPresenter } from "../../presenters/transactions-presenter";
import { z } from "zod";

const pageQueryParamSchema = z.object({
  page: z.coerce.number().min(1).default(1),
});

export class FetchManyTransactionsController {
  async handle(request: FastifyRequest) {
    const { page } = pageQueryParamSchema.parse(request.query);
    const fetchManyTransactionsUseCase = makeFetchManyTransactionsUseCase();

    const result = await fetchManyTransactionsUseCase.execute({
      clientId: request.user.sub,
      page,
    });

    if (result.isLeft()) {
      return new Error("BAD REQUEST!");
    }

    const transactions = result.value.transactions;

    return { transactions: transactions.map(TransactionPresenter.toHTTP) };
  }
}
