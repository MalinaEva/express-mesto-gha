const { sendResponse } = require('../utils/sendResponse');
const { BAD_REQUEST } = require('../utils/statuses');

const validateRequest = (schema, target = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[target]);

    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return sendResponse(res, { message: errorMessage }, BAD_REQUEST);
    }

    next();
  };
};

module.exports = validateRequest;
