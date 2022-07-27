import Joi from "joi";

export const bookSeatValidation = {
  body: Joi.object({
    userId: Joi.string().required(),
    showId: Joi.string().required(),
    showDate: Joi.date().required().iso(),
    seatIds: Joi.array().items(Joi.string().guid().required()).required(),
  }),
};
