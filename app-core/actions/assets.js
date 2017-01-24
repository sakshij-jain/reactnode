/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var ActionTypeStore = require('../stores/AssetStore').default;
var ActionTypes = require('../constants/ActionTypes');

export function fetchAssets(context, payload, done) {
  context.dispatch(ActionTypes.FETCH_ASSETS, null);
  context.service.read('asset', {}, {}, function(err, assets) {
    if(err) {
      context.dispatch(ActionTypes.FETCH_ASSETS_FAILURE, err);
      done();
    }
    context.dispatch(ActionTypes.FETCH_ASSETS_SUCCESS, assets);
    done();
  });
}

export function getAssetsById(context, payload, done) {
  context.dispatch(ActionTypes.FETCH_ASSETS, null);
  context.service.read('asset', payload, {}, function(err, assets){
    if(err) {
      context.dispatch(ActionTypes.FETCH_ASSETS_FAILURE, err);
      done();
    }
    context.dispatch(ActionTypes.FETCH_ASSETS_SUCCESS, assets);
    done();
  });
}

export function getAsset(context, route, done) {
  context.dispatch(ActionTypes.GET_ASSET_SUCCESS, null);
  context.service.read('asset', {id: route.params.id}, {}, function(err, asset) {
    if(err) {
      context.dispatch(ActionTypes.GET_ASSET_FAILURE, err);
      done();
    }
    context.dispatch(ActionTypes.GET_ASSET_SUCCESS, asset);
    done();
  });
}
