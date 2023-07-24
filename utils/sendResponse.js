const { OK } = require('./statuses');

module.exports.sendResponse = (res, data, statusCode = OK, withoutVersion = true) => {
  let responseData = data;
  if (withoutVersion && typeof data.toObject === 'function') {
    responseData = data.toObject({ versionKey: false });
  }
  res.status(statusCode).send(responseData);
};
