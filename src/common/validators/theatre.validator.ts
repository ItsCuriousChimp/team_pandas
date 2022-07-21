import Joi from "joi";

export const theatreInputValidation = {
  query: Joi.object({
    movieId: Joi.string().required(),
    cityId: Joi.string().required(),
  }),
};
