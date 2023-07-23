const router = require('express').Router();
const validateProfileUpdates = require('../middleware/validateProfileUpdates');
const {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', validateProfileUpdates, updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
