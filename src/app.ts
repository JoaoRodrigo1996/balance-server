import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import { ZodError } from "zod";
import { transactionsRoutes } from "./infra/http/controllers/transactions/routes";
import { env } from "@/env";
import { clientsRoutes } from "./infra/http/controllers/clients/routes";

export const app = fastify();
app.register(cors, {
  origin: true,
});
app.register(fastifyJwt, {
  secret: env.JWT_SECRET_KEY,
  cookie: {
    cookieName: "accessToken",
    signed: false,
  },
  sign: {
    expiresIn: "30d",
  },
});

app.register(fastifyCookie);
app.register(transactionsRoutes);
app.register(clientsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    //  Here we should log to an external tool like dataDog e.t.c
  }

  return reply.status(500).send({ message: "Internal server error." });
});
