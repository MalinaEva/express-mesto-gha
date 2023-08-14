const router = require('express').Router();
const validateRequest = require('../middleware/validateRequest');
const {
  createCardValidationSchema,
  cardIdValidationSchema,
} = require('../validations/cardValidations');
const {
  getCards,
  getCardById,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const auth = require('../middleware/auth'); // Эти контроллеры должны быть созданы

router.use(auth);

router.get('/', getCards);
router.get('/:cardId', validateRequest(cardIdValidationSchema, 'params'), getCardById);
router.post('/', validateRequest(createCardValidationSchema), createCard);
router.delete('/:cardId', validateRequest(cardIdValidationSchema, 'params'), deleteCard);
router.put('/:cardId/likes', validateRequest(cardIdValidationSchema, 'params'), likeCard);
router.delete('/:cardId/likes', validateRequest(cardIdValidationSchema, 'params'), dislikeCard);

module.exports = router;
