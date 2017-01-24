'use strict';

const AssetApi = require('../factories/assetApi').default;

module.exports = {
  name: 'asset',
  // at least one of the CRUD methods is required
  read: function (req, resource, params, config, callback) {
    if(params.assetTypeId) {
      AssetApi.getAssetsById('AMTAssets', params.assetTypeId, function (err, response) {
        callback(err, response);
      });
    } else if(params.id) {
      AssetApi.getAssetById('AMTAssets', params.id, function (err, response) {
        callback(err, response);
      });
    } else {
      AssetApi.get('AMTAssets', function (err, response) {
        callback(err, response);
      });
    }
  },
};
