import Joi from "joi";

export const movieCityLanguageValidation = {
  query: Joi.object({
    language: Joi.string().required(),
    cityId: Joi.string().required(),
  }),
};