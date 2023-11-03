import { makeTransactionUseCase } from "@/infra/http/factories/make-transaction-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const createTransactionsBodySchema = z.object({
  title: z.string(),
  amount: z.number(),
  type: z.enum(["INCOME", "OUTCOME"]),
});

export class CreateTransactionsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { title, amount, type } = createTransactionsBodySchema.parse(
      request.body,
    );

    const createTransactionsUseCase = makeTransactionUseCase();

    await createTransactionsUseCase.execute({
      clientId: request.user.sub,
      title,
      amount,
      type,
    });

    return reply.status(201).send();
  }
}
