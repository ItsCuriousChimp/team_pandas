import Joi from "joi";

export const seatValidation = {
  query: Joi.object({
    movieId: Joi.string().guid(),
    theatreId: Joi.string().guid(),
    showId: Joi.string().required().guid(),
  }),
};
