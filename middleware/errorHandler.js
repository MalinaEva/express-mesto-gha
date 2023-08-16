const { sendResponse } = require('../utils/sendResponse');
const {
  NOT_VALID_DATA,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
  UNAUTHORIZED,
  UNAUTHORIZED_MESSAGE,
  CONFLICT,
  CONFLICT_MESSAGE,
} = require('../utils/statuses');

function handleError(err, res) {
  if (['CastError', 'ValidationError'].includes(err.name)) {
    return sendResponse(res, { message: NOT_VALID_DATA }, BAD_REQUEST);
  }
  if (err.name === 'AuthError') {
    return sendResponse(res, { message: err.message }, UNAUTHORIZED);
  }
  if (err.statusCode === UNAUTHORIZED) {
    return sendResponse(res, { message: UNAUTHORIZED_MESSAGE }, UNAUTHORIZED);
  }
  if (err.code === 11000) {
    return sendResponse(res, { message: CONFLICT_MESSAGE }, CONFLICT);
  }
  return sendResponse(res, { message: INTERNAL_SERVER_ERROR_MESSAGE }, INTERNAL_SERVER_ERROR);
}

module.exports = handleError;
