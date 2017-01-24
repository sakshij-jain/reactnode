var request = require('request');

const API_ENDPOINT = process.env.API_ENDPOINT;

var apiRequest = request.defaults({
    headers: {'Authorization': 'RIFNC8iNm2GVbd0SXX3ZXc3KJnpMfZ0qgkRsLQ0gJubFlxEDAWsOFWjoujDp8NYl'},
    baseUrl: API_ENDPOINT
});


var Api = {
    get: function (resource, cb) {
        apiRequest.get(resource, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                cb(null, JSON.parse(body))
            }
            else {
                cb(error, null)
            }
        });
    },
    deleteById: function (resource, id, cb) {
        console.log(id);
        apiRequest.delete(`${resource}/${id}`, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                cb(null, JSON.parse(body))
            }
            else {
                cb(error, null)
            }
        })
    }
};

export default Api;
