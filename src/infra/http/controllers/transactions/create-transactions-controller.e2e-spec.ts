import { app } from "@/app";
import request from "supertest";

describe("", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a new transaction", async () => {
    const response = await request(app.server).post("/transactions").send({
      title: "New transaction",
      amount: 3000,
      type: "income",
    });

    expect(response.statusCode).toEqual(201);
  });
});
