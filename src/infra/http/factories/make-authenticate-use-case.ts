import { PrismaClientsRepository } from "@/infra/database/prisma/repositories/prisma-clients-repository";
import { AuthenticateUseCase } from "../../../domain/balance/application/use-cases/authenticate";
import { BcryptHasher } from "@/infra/cryptography/bcrypt-hasher";
import { JwtEncrypter } from "@/infra/cryptography/jwt-encrypter";

export function makeAuthenticateUseCase() {
  const clientsRepository = new PrismaClientsRepository();
  const hashGenerator = new BcryptHasher();
  const jwtEncrypter = new JwtEncrypter();

  const useCase = new AuthenticateUseCase(
    clientsRepository,
    hashGenerator,
    jwtEncrypter,
  );

  return useCase;
}
