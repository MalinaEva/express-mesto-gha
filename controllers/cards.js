const card = require('../models/card');
const statuses = require('../utils/statuses');
const handleError = require('../middleware/errorHandler');
const { sendResponse } = require('../utils/sendResponse');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  card.create({ name, link, owner })
  .then(card => sendResponse(res, card, statuses.CREATED))
  .catch(err => handleError(err, res));
};

module.exports.getCards = (req, res) => {
  card.find({}).select('-__v')
  .populate([
    { path: 'owner', select: '-__v' },
    { path: 'likes', select: '-__v' },
  ])
  .then(cards => sendResponse(res, cards))
  .catch(err => handleError(err, res));
};

module.exports.getCardById = (req, res) => {
  card.findById(req.params.cardId)
  .populate([
    { path: 'owner', select: '-__v' },
    { path: 'likes', select: '-__v' },
  ])
  .then(card => {
    if (!card) {
      return sendResponse(res, { message: statuses.CARD_NOT_FOUND }, statuses.NOT_FOUND);
    }
    sendResponse(res, card);
  })
  .catch(err => handleError(err, res));
};

// Поставить лайк карточке
exports.likeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
  .populate([
    { path: 'owner', select: '-__v' },
    { path: 'likes', select: '-__v' },
  ])
  .then(card => {
    if (!card) {
      return sendResponse(res, { message: statuses.CARD_NOT_FOUND }, statuses.NOT_FOUND);
    }
    sendResponse(res, card);
  })
  .catch(err => handleError(err, res));
};

// Убрать лайк с карточки
exports.dislikeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
  .populate([
    { path: 'owner', select: '-__v' },
    { path: 'likes', select: '-__v' },
  ])
  .then(card => {
    if (!card) {
      return sendResponse(res, { message: statuses.CARD_NOT_FOUND }, statuses.NOT_FOUND);
    }
    sendResponse(res, card);
  })
  .catch(err => handleError(err, res));
};
