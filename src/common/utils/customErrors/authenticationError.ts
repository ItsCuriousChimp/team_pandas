import { loginDto } from "../../../data/dtos/login.dto";
import CustomError from "./customError";

class AuthenticationError extends CustomError {
  constructor(data: loginDto) {
    super({
      message: "Invalid credentials",
      statusCode: 401,
      data: data,
    });

    this.errorType = this.constructor.name;
  }
}

export default AuthenticationError;
