import { Either, left, right } from "@/core/either";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";
import { ClientsRepository } from "../repositories/clients-repository";
import { HashComparer } from "../cryptography/hash-comparer";
import { Encrypter } from "../cryptography/encrypter";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateUseCaseResponse = Either<
  WrongCredentialsError,
  { accessToken: string }
>;

export class AuthenticateUseCase {
  constructor(
    private clientsRepository: ClientsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const client = await this.clientsRepository.findByEmail(email);

    if (!client) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      client.password,
    );

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: client.id.toString(),
    });

    return right({ accessToken });
  }
}
