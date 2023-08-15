const jwt = require('jsonwebtoken');
const handleError = require('./errorHandler');
const { UNAUTHORIZED } = require('../utils/statuses');

module.exports = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return handleError({ statusCode: UNAUTHORIZED }, res);
  }

  const { JWT_SECRET } = process.env;

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (err) {
    return handleError(err, res);
  }
};
