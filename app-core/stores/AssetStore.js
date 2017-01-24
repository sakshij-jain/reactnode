'use strict';
var createStore = require('fluxible/addons').createStore;
var _ = require('lodash');

var AssetStore = createStore({
  storeName: 'AssetStore',
  handlers: {
    'FETCH_ASSETS_SUCCESS': 'handleFetchAssetsSuccess',
    'FETCH_ASSETS_FAILURE': 'handleFetchAssetsFailure',
    'GET_ASSET_SUCCESS': 'handleGetAssetSuccess',
    'GET_ASSET_FAILURE': 'handleGetAseetFailure'
  },
  initialize: function () {
    this.assets = [];
    this.message = null;
  },
  handleFetchAssetsSuccess (payload) {
    this.assets = payload;
    this.emitChange();
  },
  handleGetAssetSuccess(payload) {
    this.assets = payload;
    this.emitChange();
  },
  handleFetchAssetsFailure() {
    this.message = 'Failed to load Assets'
    this.emitChange();
  },
  handleGetAssetFailure() {
    this.message = "Failed to load Asset";
    this.emitChange();
  },
  getAll: function () {
    return {
      assets : this.assets,
      message: this.message
    };
  },
  dehydrate: function () {
    return {
      assets: this.assets,
      message: this.message
    };
  },
  rehydrate: function (state) {
    this.assets = state.assets;
    this.message = state.message;
  }
});

export default AssetStore;
