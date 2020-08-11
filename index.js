'use strict';

require('dotenv').config();
const logger = require('./config/winston');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const corsOpts = require('./config/corsOpts');
const idp = require('./routes/idp');

var app = express();

app.use(cors(corsOpts));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', idp);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        logger.info(`dev: ${err}`);
        logger.info(`dev: ${req}`);
        logger.info(`dev: ${res}`);
        res.status(err.status || 500).send({
            message: err.message,
            error: err,
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    logger.info(`prod: ${err}`);
    res.status(err.status || 500).send({
        message: err.message,
        error: {},
    });
});


const server = app.listen(process.env.PORT || 8080);


module.exports = server;