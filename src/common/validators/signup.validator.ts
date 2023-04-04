import Joi from "joi";
import { passwordRegex } from "../constants/constants";

export const signupValidation = {
  body: Joi.object({
    username: Joi.string().alphanum().min(3).max(128).required(),
    password: Joi.string().regex(passwordRegex).required(),
    email: Joi.string().email().required(),
    name: Joi.string()
      .pattern(/^[a-zA-Z]+$/, { name: "alphabets" })
      .required(),
    phoneNumber: Joi.string().min(5).max(32).required(),
    cityId: Joi.string().guid().required(),
  }),
};
