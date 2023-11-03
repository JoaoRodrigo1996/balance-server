import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { makeClientUseCase } from "@/infra/http/factories/make-client-use-case";

const createClientsBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export class CreateClientsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = createClientsBodySchema.parse(
      request.body,
    );

    const createClientsUseCase = makeClientUseCase();

    await createClientsUseCase.execute({ name, email, password });

    return reply.status(201).send();
  }
}
