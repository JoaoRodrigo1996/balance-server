import { ClientsRepository } from "@/domain/balance/application/repositories/clients-repository";
import { Client } from "@/domain/balance/entities/client";

export class InMemoryClientsRepository implements ClientsRepository {
  public items: Client[] = [];

  async create(client: Client) {
    this.items.push(client);
  }

  async findByEmail(email: string) {
    const client = this.items.find((item) => item.email === email);

    if (!client) {
      return null;
    }

    return client;
  }

  async findById(clientId: string): Promise<Client | null> {
    const client = this.items.find((item) => item.id.toString() === clientId);

    if (!client) {
      return null;
    }

    return client;
  }
}
