'use strict';
var createStore = require('fluxible/addons').createStore;
var _ = require('lodash');

var AssetTypeStore = createStore({
    storeName: 'AssetTypeStore',
    handlers: {
        'FETCH_ASSET_TYPES_SUCCESS': 'handleFetchTypeSuccess',
        'DELETE_ASSET_TYPE_SUCCESS': 'handleDeleteTypeSuccess',
        'ADD_ASSET_TYPE_SUCCESS': 'handleAddTypeSuccess',
        'ADD_ASSET_TYPE_FAILURE': 'handleAddTypeFailure',
        'GET_ASSET_TYPE_SUCCESS': 'handleAssetTypeSuccess',
        'GET_ASSET_TYPE_FAILURE': 'handleAssetTypefailure'
    },
    initialize: function () {
        this.assetTypes = [];
        this.message = null;
        this.assetType = {};
    },
    handleFetchTypeSuccess (payload) {
        this.assetTypes = payload;
        this.emitChange();
    },
    handleDeleteTypeSuccess (payload) {
        _.remove(this.assetTypes, {
            id : payload.id
        });
        this.emitChange();
    },
    handleAssetTypeSuccess (payload) {
      this.assetType = payload;
      this.emitChange();
    },
    handleAddTypeSuccess (payload) {
      this.message = 'Asset Type added';
      this.emitChange();
    },
    handleAddTypeFailure() {
      this.message = 'Failed to add Asset Type';
      this.emitChange();
    },
    handleAssetTypeFailure() {
      this.message = 'Failed to load Asset Type'
      this.emitChange();
    },
    getAll: function () {
        return {
          assetTypes : this.assetTypes,
          assetType : this.assetType,
          message: this.message
        };
    },
    dehydrate: function () {
        return {
            assetTypes: this.assetTypes,
            assetType: this.assetType,
            message: this.message
        };
    },
    rehydrate: function (state) {
        this.assetTypes = state.assetTypes;
        this.assetType = state.assetType;
        this.message = state.message;
    }
});

export default AssetTypeStore;
