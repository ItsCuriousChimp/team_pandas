import Joi from "joi";

export const showValidation = {
  query: Joi.object({
    movieId: Joi.string().required().guid(),
  }),
  params: Joi.object({
    theatreId: Joi.string().required().guid(),
  }),
};
