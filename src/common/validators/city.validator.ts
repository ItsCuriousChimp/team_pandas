import Joi from "joi";

export const cityValidator = {
  query: Joi.object({
    cityId: Joi.string().guid().required(),
  }),
};
