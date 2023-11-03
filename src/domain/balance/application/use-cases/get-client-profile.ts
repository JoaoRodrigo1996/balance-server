import { Either, left, right } from "@/core/either";
import { ClientsRepository } from "../repositories/clients-repository";
import { Client } from "../../entities/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetClientProfileUseCaseRequest {
  clientId: string;
}

type GetClientProfileUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    client: Client;
  }
>;

export class GetClientProfileUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    clientId,
  }: GetClientProfileUseCaseRequest): Promise<GetClientProfileUseCaseResponse> {
    const client = await this.clientsRepository.findById(clientId);

    if (!client) {
      return left(new ResourceNotFoundError());
    }

    return right({ client });
  }
}
