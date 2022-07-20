import { Request,Response } from "express";
import { accountService } from "../services/logout.service";

class AccountController{
    RemoveToken = (req: Request,res: Response) => {
        try{
            const {token} = req.params;
            const valid = accountService.deleteAccountToken(token);
            res.json(valid).send("Sucessfully Logged out!");
        }catch(error){
            res.status(400).send("Error!")
        }
    };
}
export const accountController = new AccountController();