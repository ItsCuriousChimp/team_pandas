import Joi from "joi";

export const seatValidation = {
  query: Joi.object({
    movieId: Joi.string().guid(),
    showId: Joi.string().required().guid(),
  }),
  params: Joi.object({
    theatreId: Joi.string().guid(),
  }),
};
