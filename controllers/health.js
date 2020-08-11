'use strict';

function checkHealth(request, response) {
    response.send(JSON.stringify({'status':'OK'}));
}

module.exports = {checkHealth}