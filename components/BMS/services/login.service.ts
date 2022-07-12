import { loginDto } from "../customTypes/login.type";
import { AccountRepository } from "../repositories/login.repository";

export class AccountService {
  accountRepositoryInstance: AccountRepository;

  constructor() {
    this.accountRepositoryInstance = new AccountRepository();
  }

  public async getAccountToken(query: loginDto): Promise<string | null> {
    const accountToken = await this.accountRepositoryInstance.getToken(query);
    return accountToken;
  }
}
