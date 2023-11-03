import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateUseCase } from "../../factories/make-authenticate-use-case";

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class AuthenticateClientController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = authenticateBodySchema.parse(request.body);

    const authenticateUseCase = makeAuthenticateUseCase();

    const result = await authenticateUseCase.execute({ email, password });

    if (result.isLeft()) {
      return reply.status(400).send({ message: "Invalid" });
    }

    const { accessToken } = result.value;

    return reply.status(200).send({ accessToken });
  }
}
