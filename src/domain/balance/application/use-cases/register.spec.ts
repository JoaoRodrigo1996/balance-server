import { InMemoryClientsRepository } from "test/repositories/in-memory-clients-repository";
import { RegisterClientUseCase } from "./register";
import { FakeHasher } from "test/cryptography/fake-hasher";

let inMemoryClientsRepository: InMemoryClientsRepository;
let fakeHasher: FakeHasher;
let sut: RegisterClientUseCase;

describe("Register client", () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository();
    fakeHasher = new FakeHasher();
    sut = new RegisterClientUseCase(inMemoryClientsRepository, fakeHasher);
  });

  it("should be able to register a new client", async () => {
    const result = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      client: inMemoryClientsRepository.items[0],
    });
  });
});
