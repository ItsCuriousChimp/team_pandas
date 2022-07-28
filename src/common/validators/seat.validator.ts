import Joi from "joi";

export const seatValidation = {
  query: Joi.object({
    movieId: Joi.string().required().guid(),
    showId: Joi.string().required().guid(),
  }),
  params: Joi.object({
    theatreId: Joi.string().required().guid(),
  }),
};
