import * as dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;

export const passwordRegex = RegExp(process.env.PASSWORD_REGEX as string);
