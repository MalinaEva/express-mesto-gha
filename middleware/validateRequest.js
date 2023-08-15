const { celebrate, Segments } = require('celebrate');

const validateRequest = (schema, target = 'body') => celebrate({ [Segments[target.toUpperCase()]]: schema });

module.exports = validateRequest;
