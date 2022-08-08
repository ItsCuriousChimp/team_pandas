import Joi from "joi";

export const movieValidator = {
  query: Joi.object({
    language: Joi.string().required(),
    cityId: Joi.string().required().guid(),
  }),
};
