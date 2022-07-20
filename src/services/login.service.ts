import { loginDto } from "../common/customTypes/login.type";
import { AccountRepository } from "../repositories/login.repository";

export class AccountService {
  accountRepository: AccountRepository;

  constructor() {
    this.accountRepository = new AccountRepository();
  }

  public async getAccountToken(query: loginDto): Promise<string | null> {
    const accountToken = await this.accountRepository.getToken(query);
    return accountToken;
  }
}
