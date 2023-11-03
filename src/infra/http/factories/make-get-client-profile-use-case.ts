import { GetClientProfileUseCase } from "@/domain/balance/application/use-cases/get-client-profile";
import { PrismaClientsRepository } from "@/infra/database/prisma/repositories/prisma-clients-repository";

export function makeGetClientProfileUseCase() {
  const clientsRepository = new PrismaClientsRepository();

  const useCase = new GetClientProfileUseCase(clientsRepository);

  return useCase;
}
