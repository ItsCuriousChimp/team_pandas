import { accountRepository } from "../repositories/logout.repository";
class AccountService {
     deleteAccountToken = async (token:string): Promise<boolean> => {
        try{
            const valid = await accountRepository.removeToken(token);
            return valid;
        }catch(error){
            throw(error);
        }
    };
 }
 export const accountService = new AccountService();
