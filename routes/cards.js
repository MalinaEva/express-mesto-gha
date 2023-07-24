const router = require('express').Router();
const {
  getCards,
  getCardById,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards'); // Эти контроллеры должны быть созданы

router.get('/', getCards);
router.get('/:cardId', getCardById);
router.post('/', createCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
