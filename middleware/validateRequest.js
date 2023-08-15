const { celebrate, Segments, Joi } = require('celebrate');

/**
 * Универсальный валидатор для celebrate.
 * @param {Joi.ObjectSchema} schema Схема Joi для валидации.
 * @param {string} segment Сегмент запроса для валидации ('body', 'params', 'query', и т.д.).
 */
const validateRequest = (schema, segment = 'body') => {
  if (!Segments[segment.toUpperCase()]) {
    throw new Error(`Invalid segment: ${segment}. Available segments are: ${Object.keys(Segments).join(', ')}`);
  }
  return celebrate({ [Segments[segment.toUpperCase()]] : schema });
};

module.exports = validateRequest;
