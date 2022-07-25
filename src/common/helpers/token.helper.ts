import { AccessTokenPayload } from "../../models/access-token.model";
import * as jwt from "jsonwebtoken";

class JWTHelper {
  public getAccessToken = (AccessTokenPayload: AccessTokenPayload): string => {
    const privateKey: string = process.env.PRIVATE_KEY as string;
    const token = jwt.sign({ AccessTokenPayload }, privateKey, {
      expiresIn: "30d",
    });
    return token;
  };
}
export const jwtHelper = new JWTHelper();
