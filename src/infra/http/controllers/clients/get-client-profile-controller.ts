import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetClientProfileUseCase } from "../../factories/make-get-client-profile-use-case";

export class GetClientProfileController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const getClientProfileUseCase = makeGetClientProfileUseCase();

    const result = await getClientProfileUseCase.execute({
      clientId: request.user.sub,
    });

    const user = result.value;

    return reply.status(200).send({ user: { ...user, password: undefined } });
  }
}
