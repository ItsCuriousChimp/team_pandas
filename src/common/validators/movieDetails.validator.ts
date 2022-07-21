import Joi from "joi";

export const movieDetailsValidation = {
  query: Joi.object({
    movieId: Joi.string().required()
  }),
}; 