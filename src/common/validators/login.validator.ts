import Joi from "joi";
import { passwordRegex } from "../constants";

export const loginValidation = {
  body: Joi.object({
    username: Joi.string().alphanum().min(3).max(128).required(),
    password: Joi.string().regex(passwordRegex).required(),
  }),
};
