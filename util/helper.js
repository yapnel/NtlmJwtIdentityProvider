'use strict';

const fs = require('fs');

function readFile(filename, next) {
	fs.readFile(filename, function (err, data) {
		if (err) {
            return next(err); 
        } else {
            return next(null,data.toString());
        }
	});
}

module.exports.readFile = readFile;