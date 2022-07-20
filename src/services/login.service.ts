import { loginDto } from "../common/customTypes/login.type";
import { accountRepository } from "../repositories/login.repository";

class AccountService {
  public async getAccountToken(query: loginDto): Promise<string | null> {
    const accountToken = await accountRepository.getToken(query);
    return accountToken;
  }
}

export const accountService = new AccountService();
