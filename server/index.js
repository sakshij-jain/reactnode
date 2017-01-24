/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var express = require('express');
var favicon = require('serve-favicon');
var serialize = require('serialize-javascript');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var debug = require('debug')('Example');
var React = require('react');
var ReactDOM = require('react-dom/server');

var app = require(`../${process.env.APP_FOLDER}/app`);

var HtmlComponent = require(`../${process.env.APP_FOLDER}/components/Html`);


var navigateAction = require('fluxible-router').navigateAction;
var createElement = require('fluxible-addons-react').createElementWithContext;
var colors = require('colors');

var server = express();
server.set('state namespace', 'App');
server.use('/public', express['static'](__dirname + '/build'));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(csrf({cookie: true}));

// Get access to the fetchr plugin instance
var fetchrPlugin = app.getPlugin('FetchrPlugin');
// Register our messages REST service
fetchrPlugin.registerService(require('./services/assetType'));
fetchrPlugin.registerService(require('./services/asset'));
// Set up the fetchr middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

function renderPage(req, res, context) {
    debug('Exposing context state');
    var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

    var mainMarkup;
    if ('0' === req.query.render) {
        mainMarkup = '';
    } else {
        mainMarkup = ReactDOM.renderToString(createElement(context));
    }

    debug('Rendering Application component into html');
    var html = ReactDOM.renderToStaticMarkup(React.createElement(HtmlComponent, {
        state: exposed,
        markup: mainMarkup
    }));

    debug('Sending markup');
    res.send(html);
}

server.use(function (req, res, next) {
    var context = app.createContext({
        req: req, // The fetchr plugin depends on this
        xhrContext: {
            _csrf: req.csrfToken() // Make sure all XHR requests have the CSRF token
        }
    });

    debug('Executing showChat action');
    if ('0' === req.query.load) {
        renderPage(req, res, context);
    } else {
        context.executeAction(navigateAction, { url: req.url, type: 'pageload' }, function (err) {
            if (err) {
                if (err.statusCode && err.statusCode === 404) {
                    next();
                } else {
                    next(err);
                }
                return;
            }
            renderPage(req, res, context);
        });
    }
});

var port = process.env.PORT;
server.listen(port);
console.log(colors.magenta('thinksys.com started.'));
console.log(colors.green('PLATFORM_ID:     '), colors.cyan(process.env.PLATFORM_ID));
console.log(colors.green('ENVIRONMENT:     '), colors.cyan(process.env.NODE_ENV));
console.log(colors.green('THINKSYS_ENV:    '), colors.cyan(process.env.THINKSYS_ENV));
console.log(colors.green('NODE_PORT:       '), colors.cyan(port));
console.log(colors.green('API_ENDPOINT:    '), colors.cyan(process.env.API_ENDPOINT));
console.log(colors.green('WWW_ROOT_URL:    '), colors.cyan(process.env.WWW_ROOT_URL));
console.log(colors.green('NODE_VERSION:    '), colors.cyan(process.version), colors.reset(''));
