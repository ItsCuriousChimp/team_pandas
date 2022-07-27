export class AccessTokenResponsePayload {
  id: string;
  iat: number;
  constructor(id: string, iat: number) {
    this.id = id;
    this.iat = iat;
  }
}
