export class User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  loggedInAtUtc?: Date | null;
  cityId: string | null;
}
