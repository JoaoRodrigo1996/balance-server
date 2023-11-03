import { RegisterClientUseCase } from "@/domain/balance/application/use-cases/register";
import { BcryptHasher } from "@/infra/cryptography/bcrypt-hasher";
import { PrismaClientsRepository } from "@/infra/database/prisma/repositories/prisma-clients-repository";

export function makeClientUseCase() {
  const clientsRepository = new PrismaClientsRepository();
  const hashGenerator = new BcryptHasher();

  const useCase = new RegisterClientUseCase(clientsRepository, hashGenerator);

  return useCase;
}
