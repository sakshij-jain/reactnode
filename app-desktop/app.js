/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var Fluxible = require('fluxible');
var fetchrPlugin = require('fluxible-plugin-fetchr');


var app = new Fluxible({
    component: require('./components/ChatApp')
});

app.plug(fetchrPlugin({
    xhrPath: '/api'
}));

app.registerStore(require('../app-desktop/stores/RouteStore'));
app.registerStore(require('../app-core/stores/AssetTypeStore').default);
app.registerStore(require('../app-core/stores/AssetStore').default);

module.exports = app;
