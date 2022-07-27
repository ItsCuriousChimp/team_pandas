import Joi from "joi";

export const userIdValidation = {
  query: Joi.object({
    userId: Joi.string().guid().required(),
  }),
};
