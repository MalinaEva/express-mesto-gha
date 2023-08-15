const Joi = require('joi');

const registerValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
  about: Joi.string().min(2).max(30).default('Исследователь'),
  avatar: Joi.string().uri().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
  email: Joi.string().email().required().messages({ 'string.email': 'Неверный формат почты' }),
  password: Joi.string().min(8).required(),
}).options({ stripUnknown: true });

const loginValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({ 'string.email': 'Неверный формат почты' }),
  password: Joi.string().min(8).required(),
}).options({ stripUnknown: true });

const userIdValidationSchema = Joi.object({
  userId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
});

const validateProfileUpdatesSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
}).options({ stripUnknown: true });

const validateAvatarUpdateSchema = Joi.object({
  avatar: Joi.string()
    .pattern(/^https?:\/\/(www\.)?[\w\-._~:/?#[\]@!$&'()*+,;=]+#?$/)
    .required(),
}).options({ stripUnknown: true });

module.exports = {
  registerValidationSchema,
  loginValidationSchema,
  userIdValidationSchema,
  validateAvatarUpdateSchema,
  validateProfileUpdatesSchema,
};
