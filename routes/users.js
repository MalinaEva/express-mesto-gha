const router = require('express').Router();
const { validateAvatarUpdateSchema, validateProfileUpdatesSchema } = require('../validations/userValidations');
const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');
const auth = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');
const { userIdValidationSchema } = require('../validations/userValidations');

router.use(auth);
router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateRequest(userIdValidationSchema, 'params'), getUser);
router.patch('/me', validateRequest(validateProfileUpdatesSchema), updateProfile);
router.patch('/me/avatar', validateRequest(validateAvatarUpdateSchema), updateAvatar);

module.exports = router;
