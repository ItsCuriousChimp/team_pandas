export class User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  loggedInAtUtc: Date | null;

  //get all details of the theatre
  // public getDetails(): object {
  //   return {
  //     name: this.name,
  //     email: this.email,
  //     phoneNumber: this.phoneNumber,
  //     lastLoggedInAt: this.loggedInAtUtc,
  //     city: this.city,
  //   };
  // }

  // //set name of the user
  // public setName(name: string): void {
  //   this.name = name;
  // }

  // //set email of the user
  // public setEmail(email: string): void {
  //   this.email = email;
  // }

  // //set phone number of the user
  // public setPhoneNumber(number: string): void {
  //   this.phoneNumber = number;
  // }

  // //set last login time of the user
  // public setLoggedInAt(loggedInAt: Date): void {
  //   this.loggedInAtUtc = loggedInAt;
  // }
}
