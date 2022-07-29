import Joi from "joi";

export const userValidation = {
  body: Joi.object({
    userId: Joi.string().guid().required(),
    email: Joi.string().email().required(),
    name: Joi.string()
      .pattern(/^[a-zA-Z]+$/, { name: "alphabets" })
      .required(),
    phonenumber: Joi.string().min(5).max(32),
  }),
};
