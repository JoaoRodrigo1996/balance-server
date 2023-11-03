import { ClientsRepository } from "@/domain/balance/application/repositories/clients-repository";
import { Client } from "@/domain/balance/entities/client";
import { PrismaClientsMapper } from "../mappers/prisma-client-mapper";
import { prisma } from "../prisma";

export class PrismaClientsRepository implements ClientsRepository {
  async create(client: Client): Promise<void> {
    const data = PrismaClientsMapper.toPrisma(client);

    await prisma.client.create({ data });
  }

  async findByEmail(email: string): Promise<Client | null> {
    const client = await prisma.client.findUnique({
      where: {
        email,
      },
    });

    if (!client) {
      return null;
    }

    return PrismaClientsMapper.toDomain(client);
  }

  async findById(clientId: string) {
    const client = await prisma.client.findUniqueOrThrow({
      where: { id: clientId },
    });

    if (!client) {
      return null;
    }

    return PrismaClientsMapper.toDomain(client);
  }
}
