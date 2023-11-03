import { Client } from "../../entities/client";

export interface ClientsRepository {
  create(client: Client): Promise<void>;
  findByEmail(email: string): Promise<Client | null>;
  findById(clientId: string): Promise<Client | null>;
}
