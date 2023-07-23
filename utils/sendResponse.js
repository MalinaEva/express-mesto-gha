const { OK } = require('./statuses');
module.exports.sendResponse = (res, data, statusCode = OK, withoutVersion = true) => {
	if (withoutVersion && typeof data.toObject === 'function') {
		data = data.toObject({ versionKey: false });
	}
	res.status(statusCode).send(data);
};
