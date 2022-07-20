import Joi from "joi";

export const loginValidation = {
  body: Joi.object({
    username: Joi.string().alphanum().min(3).max(128).required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,256}/)
      .required(),
  }),
};
