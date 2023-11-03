import { FastifyInstance } from "fastify";
import { CreateClientsController } from "./create-clients-controller";
import { AuthenticateClientController } from "./authenticate-client-controller";
import { verifyJWT } from "../../middleware/verify-jwt";
import { GetClientProfileController } from "./get-client-profile-controller";

const createClientsController = new CreateClientsController();
const authenticateController = new AuthenticateClientController();

const getClientProfileController = new GetClientProfileController();

export async function clientsRoutes(app: FastifyInstance) {
  app.post("/accounts", createClientsController.handle);
  app.post("/session", authenticateController.handle);

  app.get("/me", { onRequest: [verifyJWT] }, getClientProfileController.handle);
}
