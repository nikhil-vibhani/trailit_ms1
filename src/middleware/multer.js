/**
 * @author kunal saxena
 */

// Use multer for express
// const multer = require('multer');

// Use @koa/multer for Koa
const multer = require('@koa/multer');

let path, upload;

(path = require('path')),
	(upload = multer({
		storage: multer.memoryStorage(),
		dest: path.resolve('./uploads'),
		filename: function(req, file, cb) {
			console.log(file);
			crypto.pseudoRandomBytes(16, function(err, buffer) {
				if (err) {
					return cb(err);
				}

				console.log(buffer);
				cb(null, buffer.toString('hex') + path.extname(file.originalname));
			});
		},
	}));

//https://github.com/expressjs/multer

//===================================== Exports ===========================================================

module.exports = {
	single: _singleFile,
	array: _fileArray,
	fields: _randomFiles,
	any: upload.any,
};

//===================================== Implementation ====================================================

function _singleFile(key) {
	return upload.single(key);
}

function _fileArray(key, count) {
	return upload.array(key, count);
}

/**
 *  Upload Multiple Files with different keys
 * @param array :: example : [{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]
 * @returns {*}
 * @private
 */
function _randomFiles(array) {
	return upload.fields(array);
}
