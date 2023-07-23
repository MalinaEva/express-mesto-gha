const { sendResponse } = require('../utils/sendResponse');
const { NOT_VALID_DATA, BAD_REQUEST } = require('../utils/statuses');

const allowedUpdates = ['name', 'about'];

const validateProfileUpdates = (req, res, next) => {
	const updates = Object.keys(req.body);
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

	if (!isValidOperation) {
		return sendResponse(res, { error: NOT_VALID_DATA }, BAD_REQUEST);
	}

	next();
};

module.exports = validateProfileUpdates;
