var axios = require('axios');

const API_ENDPOINT = process.env.API_ENDPOINT;
const ACCESS_TOKEN = 'RIFNC8iNm2GVbd0SXX3ZXc3KJnpMfZ0qgkRsLQ0gJubFlxEDAWsOFWjoujDp8NYl';

axios.defaults.baseURL = API_ENDPOINT;

var AxiosApi = {

  get: function(resource, cb) {
    axios.get(`${resource}?access_token=${ACCESS_TOKEN}`)
    .then(function (res) {
      cb(null, res.data);
    })
    .catch(function (err) {
      console.log('err', err.response);
      cb(err.response.status, null);
    });
  },

  post: function(resource, data, cb) {
    axios.post(`${resource}?access_token=${ACCESS_TOKEN}`, data)
    .then(function (res) {
      console.log('res', res.data);
      cb(null, res.status);
    })
    .catch(function (err) {
      console.log('err', err.response);
      cb(err.response.status, null);
    });
  },

  deleteById: function(resource, id, cb) {
    axios.delete(`${resource}/${id}?access_token=${ACCESS_TOKEN}`)
    .then(function (res) {
      cb(null, res.data.count);
    })
    .catch(function (err) {
      console.log('err', err.response);
      cb(err.response.status, null);
    });
  },

  getById: function(resource, id, cb) {
    axios.get(`${resource}/${id}?access_token=${ACCESS_TOKEN}`)
    .then(function (res) {
      cb(null, res.data);
    })
    .catch(function (err) {
      console.log('err', err.response);
      cb(err.response.status, null);
    });
  }

};

export default AxiosApi;
