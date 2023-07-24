const { sendResponse } = require('../utils/sendResponse');
const { NOT_VALID_DATA, BAD_REQUEST, INTERNAL_SERVER_ERROR } = require('../utils/statuses');

function handleError(err, res) {
  if (['CastError', 'ValidationError'].includes(err.name)) {
    return sendResponse(res, { message: NOT_VALID_DATA }, BAD_REQUEST);
  }
  return sendResponse(res, { message: err.message }, INTERNAL_SERVER_ERROR);
}

module.exports = handleError;
