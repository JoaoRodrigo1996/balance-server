import { app } from "@/app";
import { Encrypter } from "@/domain/balance/application/cryptography/encrypter";

export class JwtEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return app.jwt.sign(payload);
  }
}
