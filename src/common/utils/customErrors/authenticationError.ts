import { loginDto } from "../../../data/dtos/login.dto";
import CustomError from "./customError";

class AuthenticationError extends CustomError {
  errorType = this.constructor.name;
  constructor(data: loginDto) {
    super({
      message: "Invalid credentials",
      statusCode: 401,
      data: data,
    });
  }
}

export default AuthenticationError;
