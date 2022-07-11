import { loginDto } from "../customTypes/account.type";
import { AccountRepository } from "../repositories/account.repository";

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
