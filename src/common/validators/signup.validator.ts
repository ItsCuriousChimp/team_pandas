import Joi from "joi";
import { passwordRegex } from "../constants/constants";

export const signupValidation = {
  body: Joi.object({
    username: Joi.string().alphanum().min(3).max(128).required(),
    password: Joi.string().regex(passwordRegex).required(),
    // confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    email: Joi.string().email().required(),
    name: Joi.string()
      .pattern(/^[a-zA-Z]+$/, { name: "alphabets" })
      .required(),
    phonenumber: Joi.string().min(5).max(32),
  }),
};

// using middle ware for joi error handling left
//https://www.digitalocean.com/community/tutorials/how-to-use-joi-for-node-api-schema-validation
//https://www.bacancytechnology.com/blog/joi-validation-in-nodejs-and-express
