import { Client } from "../../entities/client";
import { ClientsRepository } from "../repositories/clients-repository";
import { HashGenerator } from "../cryptography/hash-generator";
import { Either, right } from "@/core/either";
import { ClientAlreadyExistsError } from "./errors/client-already-exists-error";

interface RegisterClientUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type RegisterClientUseCaseResponse = Either<
  ClientAlreadyExistsError,
  {
    client: Client;
  }
>;

export class RegisterClientUseCase {
  constructor(
    private clientRepository: ClientsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterClientUseCaseRequest): Promise<RegisterClientUseCaseResponse> {
    const clientAlreadyExists = await this.clientRepository.findByEmail(email);

    if (clientAlreadyExists) {
      throw new Error("Client already exists.");
    }

    const passwordHash = await this.hashGenerator.hash(password);

    const client = Client.create({
      name,
      email,
      password: passwordHash,
    });

    await this.clientRepository.create(client);

    return right({ client });
  }
}
