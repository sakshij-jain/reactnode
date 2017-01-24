var axios = require('axios');

const API_ENDPOINT = process.env.API_ENDPOINT;
const ACCESS_TOKEN = 'RIFNC8iNm2GVbd0SXX3ZXc3KJnpMfZ0qgkRsLQ0gJubFlxEDAWsOFWjoujDp8NYl';

axios.defaults.baseURL = API_ENDPOINT;

var AssetApi = {

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

  getAssetsById: function(resource, assetTypeId, cb) {
    axios.get(`${resource}?access_token=${ACCESS_TOKEN}`,{
      params: {
        "filter": {
            "where": {
              "assetTypeId" : assetTypeId
            }
        }
      }
    })
    .then(function (res) {
      cb(null, res.data);
    })
    .catch(function (err) {
      console.log('err', err.response);
      cb(err.response.status, null);
    });
  },

  getAssetById: function(resource, id, cb) {
    axios.get(`${resource}?access_token=${ACCESS_TOKEN}`,{
      params: {
        "filter": {
            "where": {
              "id" : id
            }
        }
      }
    })
    .then(function (res) {
      cb(null, res.data);
    })
    .catch(function (err) {
      console.log('err', err.response);
      cb(err.response.status, null);
    });
  }

};

export default AssetApi;
