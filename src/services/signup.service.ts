import { userRepository } from "../repositories/user.repository";
import { AccountRepository } from "../repositories/account.repository";
import { signupDto } from "../common/customTypes/signup.type";
import { Account } from "../models/account.model";
import { hashHelper } from "../common/helpers/hash.helper";
import { jwtHelper } from "../common/helpers/token.helper";
import { AccessTokenPayload } from "../models/access-token.model";
export class SignupService {
  async createUser(query: signupDto): Promise<string | null> {
    const accountRepository = new AccountRepository(query.username);
    const isAccountExists = accountRepository.getAccount();
    if (isAccountExists != null) {
      return null;
    }
    const passwordHash: string = await hashHelper.generateHash(query.password);
    const accountId: string = await accountRepository.CreateAccount(
      passwordHash
    );
    //need to filter out query so that onlyt required fields are sent
    const userId: string = await userRepository.createUser(query);
    const account: Account = await accountRepository.updateAccountWithUserId(
      accountId,
      userId
    );
    const accessTokenPayload = new AccessTokenPayload(account.userId);
    const token = jwtHelper.getAccessToken(accessTokenPayload);
    return token;
  }
}
export const signupService = new SignupService();
