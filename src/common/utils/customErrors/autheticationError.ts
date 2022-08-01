import { loginDto } from "../../../data/dtos/login.dto";
import CustomError from "./customError";

class AuthenticationError extends CustomError {
  errorType: string;
  constructor(errorType: string, data: loginDto) {
    super({});
    this.message = "Invalid Credentials";
    this.statusCode = 401;
    this.data = data;
    this.errorType = errorType;
  }
}

export default AuthenticationError;
