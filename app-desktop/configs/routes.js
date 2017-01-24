import { fetchAssetTypes, getAssetType } from '../../app-core/actions/assetTypes';
import { getAsset } from '../../app-core/actions/assets';

module.exports = {
    assetTypes: {
        path: '/asset-types',
        method: 'get',
        handler: () => require('../components/assetType/AssetTypesPage.js').default,
        action: function (context, payload, done) {
            context.executeAction(fetchAssetTypes, {}, done);
        }
    },
    createAssetType: {
        path: '/asset-types/create',
        method: 'get',
        handler: () => require('../components/assetType/manage/AssetTypePage.js').default
    },
    getAssetType: {
      path: `/asset-types/:id`,
      method: 'get',
      handler: () => require('../components/assetType/AssetType.js').default,
      action: function (context, route, done) {
          context.executeAction(getAssetType, route, done);
          done();
      }
    },
    assets: {
        path: '/assets',
        method: 'get',
        handler: () => require('../components/asset/AssetsPage.js').default
    },
    createAsset: {
      path: '/assets/create',
      method: 'get',
      handler: () => require('../components/asset/AssetCreatePage.js').default
    },
    getAsset: {
      path: `/assets/:id`,
      method: 'get',
      handler: () => require('../components/asset/Asset.js').default,
      action: function(context, route, done) {
        context.executeAction(getAsset, route, done);
        done();
      }
    }
};
