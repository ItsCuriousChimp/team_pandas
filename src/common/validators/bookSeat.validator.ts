import Joi from "joi";

export const bookSeatValidation = {
  body: Joi.object({
    userId: Joi.string().required(),
    showId: Joi.string().required(),
    numberOfSeatsBooked: Joi.number().required().min(1).max(150),
    showDate: Joi.date().required().iso(),
    seatIds: Joi.string().required(),
  }),
};
