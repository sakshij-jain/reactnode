'use strict';

const AxiosApi = require('../factories/axiosApi').default;

module.exports = {
  name: 'assetType',
  // at least one of the CRUD methods is required
  read: function (req, resource, params, config, callback) {
    if(params.id) {
      AxiosApi.getById('AMTAssetTypes', params.id, function (err, response) {
        callback(err, response);
      });
    } else {
      AxiosApi.get('AMTAssetTypes', function (err, response) {
        callback(err, response);
      });
    }
  },
  create: function (req, resource, params, body, config, callback) {
    AxiosApi.post('AMTAssetTypes', body, function (err, response) {
      callback(err, response);
    });
  },
  delete: function (req, resource, params, config, callback) {
    AxiosApi.deleteById('AMTAssetTypes', params.id, function (err, response) {
      callback(err, response);
    });
  }
};

// const Api = require('../factories/api').default;
// module.exports = {
//     name: 'assetType',
//     // at least one of the CRUD methods is required
//     read: function (req, resource, params, config, callback) {
//         AxiosApi.get('AMTAssetTypes', function (err, response) {
//             callback(err, response);
//         });
//     },
//     delete: function (req, resource, params, config, callback) {
//         AxiosApi.deleteById('AMTAssetTypes', params.id, function (err, response) {
//             callback(err, response);
//         });
//     }
//
// };
