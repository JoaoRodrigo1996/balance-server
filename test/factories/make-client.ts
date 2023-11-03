import { faker } from "@faker-js/faker";

import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Client, ClientProps } from "@/domain/balance/entities/client";

export function makeClient(
  override: Partial<ClientProps> = {},
  id?: UniqueEntityId,
) {
  const client = Client.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  );

  return client;
}
