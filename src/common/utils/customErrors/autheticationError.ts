import { loginDto } from "../../../data/dtos/login.dto";
import CustomError from "./customError";

class AuthenticationError extends CustomError {
  constructor(errorType: string, data: loginDto) {
    super({
      message: "Invalid credentials",
      statusCode: 401,
      data: data,
    });
    this.errorType = errorType;
  }
}

export default AuthenticationError;
