import Joi from "joi";

export const bookSeatValidation = {
  body: Joi.object({
    userId: Joi.string().required().guid(),
    showId: Joi.string().required().guid(),
    showDate: Joi.date().required().iso(),
    seatIds: Joi.array().items(Joi.string().guid().required()).required(),
  }),
};
