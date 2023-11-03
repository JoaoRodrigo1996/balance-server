import { FastifyInstance } from "fastify";
import { CreateTransactionsController } from "./create-transactions-controller";
import { verifyJWT } from "../../middleware/verify-jwt";
import { FetchManyTransactionsController } from "./fetch-many-transactions-controller";

const createTransactionsController = new CreateTransactionsController();
const fetchManyTransactionsController = new FetchManyTransactionsController();

export async function transactionsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/transactions", createTransactionsController.handle);
  app.get("/transactions", fetchManyTransactionsController.handle);
}
