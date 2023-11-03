import { InMemoryClientsRepository } from "test/repositories/in-memory-clients-repository";
import { GetClientProfileUseCase } from "./get-client-profile";
import { makeClient } from "test/factories/make-client";

let inMemoryClientsRepository: InMemoryClientsRepository;
let sut: GetClientProfileUseCase;

describe("Get client profile", () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository();
    sut = new GetClientProfileUseCase(inMemoryClientsRepository);
  });

  it("should be able to get client profile", async () => {
    const newClient = makeClient({});

    await inMemoryClientsRepository.create(newClient);

    const result = await sut.execute({
      clientId: newClient.id.toString(),
    });

    expect(result.isRight()).toBe(true);
  });
});
