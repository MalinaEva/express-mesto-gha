const user = require('../models/user');
const statuses = require('../utils/statuses');
const handleError = require('../middleware/errorHandler');
const { sendResponse } = require('../utils/sendResponse');

module.exports.getUsers = (req, res) => {
  user.find({}).select('-__v')
    .then((data) => sendResponse(res, data))
    .catch((err) => handleError(err, res));
};

module.exports.getUser = (req, res) => {
  user.findById(req.params.userId)
    .then((data) => {
      if (!data) {
        return sendResponse(res, { message: statuses.USER_NOT_FOUND }, statuses.NOT_FOUND);
      }
      return sendResponse(res, data);
    })
    .catch((err) => handleError(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  user.create({ name, about, avatar })
    .then((data) => sendResponse(res, data, statuses.CREATED))
    .catch((err) => handleError(err, res));
};

exports.updateProfile = (req, res) => {
  user.findByIdAndUpdate(req.user._id, { ...req.body }, { new: true, runValidators: true })
    .then((data) => {
      if (!data) {
        return sendResponse(res, { message: statuses.USER_NOT_FOUND }, statuses.NOT_FOUND);
      }
      return sendResponse(res, data);
    })
    .catch((err) => handleError(err, res));
};

exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  user.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((data) => {
      if (!data) {
        return sendResponse(res, { message: statuses.USER_NOT_FOUND }, statuses.NOT_FOUND);
      }
      return sendResponse(res, data);
    })
    .catch((err) => handleError(err, res));
};
