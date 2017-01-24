/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var ActionTypeStore = require('../stores/AssetTypeStore');
var ActionTypes = require('../constants/ActionTypes');

export function fetchAssetTypes(context, payload, done) {
    context.dispatch(ActionTypes.FETCH_ASSET_TYPES, null);
    context.service.read('assetType', {}, {}, function (err, assetTypes) {
        if (err) {
            context.dispatch(ActionTypes.FETCH_ASSET_TYPES_FAILURE, err);
            done();
        }
        context.dispatch(ActionTypes.FETCH_ASSET_TYPES_SUCCESS, assetTypes);
        done();
    });
}


export function deleteAssetType(context, payload, done) {
    context.dispatch(ActionTypes.DELETE_ASSET_TYPE);
    context.service.delete('assetType', {id:payload.id}, {}, function (err, assetType) {
        if (err) {
            context.dispatch(ActionTypes.DELETE_ASSET_TYPE_FAILURE, err);
            done();
        }
        context.dispatch(ActionTypes.DELETE_ASSET_TYPE_SUCCESS, payload);
        done();
    });
}

export function getAssetType(context, route, done) {
  context.dispatch(ActionTypes.GET_ASSET_TYPE, null);
  context.service.read('assetType', {id:route.params.id}, {}, function (err, assetType) {
      if (err) {
          context.dispatch(ActionTypes.GET_ASSET_TYPE_FAILURE, err);
          done();
      }
      context.dispatch(ActionTypes.GET_ASSET_TYPE_SUCCESS, assetType);
      done();
  });
}

export function addAssetType(context, payload, done) {
  context.dispatch(ActionTypes.ADD_ASSET_TYPE, payload);
  context.service.create('assetType', {}, payload, function(err, response) {
    if(err) {
      context.dispatch(ActionTypes.ADD_ASSET_TYPE_FAILURE, err);
      done();
    }
    context.dispatch(ActionTypes.ADD_ASSET_TYPE_SUCCESS, response);
    done();
  });
}
