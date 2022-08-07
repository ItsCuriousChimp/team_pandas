import Joi from "joi";

export const theatreInputValidation = {
  query: Joi.object({
    movieId: Joi.string().required().guid(),
    cityId: Joi.string().required().guid(),
  }),
};
