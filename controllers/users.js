const user = require('../models/user');
const statuses = require('../utils/statuses');
const handleError = require('../middleware/errorHandler');
const { sendResponse } = require('../utils/sendResponse');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
  .then((hashedPassword) => {
    return user.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword
    });
  })
  .then((data) => {
    const { password, ...userData } = data.toObject();
    sendResponse(res, userData, statuses.CREATED);
  })
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

exports.login = (req, res) => {
  const { email, password } = req.body;

  user.findOne({ email }).select('+password')
  .then((user) => {
    if (!user) {
      throw new Error('Неправильные почта или пароль');
    }

    return bcrypt.compare(password, user.password)
    .then((matched) => {
      if (!matched) {
        throw new Error('Неправильные почта или пароль');
      }

      const JWT_SECRET = process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N';

      const token = jwt.sign(
        { _id: user._id.toString() },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'strict'
      }).send({ message: 'Успешный вход' });
    });
  })
  .catch((err) => handleError(err, res));
};

module.exports.getCurrentUser = (req, res) => {
  user.findById(req.user._id)
  .then(user => {
    if (!user) {
      return sendResponse(res, { message: 'Пользователь не найден' }, statuses.NOT_FOUND);
    }
    res.send(user);
  })
  .catch(err => {
    return sendResponse(res, { message: 'Произошла ошибка на сервере' }, statuses.INTERNAL_SERVER_ERROR);
  });
};
