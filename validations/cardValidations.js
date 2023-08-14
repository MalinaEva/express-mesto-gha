const Joi = require('joi');

exports.createCardValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  link: Joi.string().uri().required(),
  owner: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
  likes: Joi.array().default([]),
  createdAt: Joi.date().default(Date.now),
}).options({ stripUnknown: true });

exports.cardIdValidationSchema = Joi.object({
  cardId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
});
