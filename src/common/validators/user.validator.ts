import Joi from "joi";

export const userValidation = {
  body: Joi.object({
    userId: Joi.string().required().guid(),
    cityId: Joi.string().guid(),
    email: Joi.string().email().required(),
    name: Joi.string()
      .pattern(/^[a-zA-Z]+$/, { name: "alphabets" })
      .required(),
    phoneNumber: Joi.string().min(5).max(32),
  }),
};
