import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Client } from "@/domain/balance/entities/client";
import { Prisma, Client as PrismaClient } from "@prisma/client";

export class PrismaClientsMapper {
  static toDomain(raw: PrismaClient) {
    return Client.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(client: Client): Prisma.ClientUncheckedCreateInput {
    return {
      id: client.id.toString(),
      name: client.name,
      email: client.email,
      password: client.password,
    };
  }
}
