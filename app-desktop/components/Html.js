/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');

/**
 * Stateless React component to handle the rendering of the HTML head section
 */
var Html = function (props) {
    return (
        <html>
        <head>
            <meta charSet="utf-8" />
            <title>Desktop</title>
            <meta name="viewport" content="width=device-width, user-scalable=no" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        </head>
        <body>
            <div id="app" dangerouslySetInnerHTML={{__html: props.markup}}></div>
            <script dangerouslySetInnerHTML={{__html: props.state}}></script>
            <script src="/public/js/client.js" defer></script>
        </body>
        </html>
    );
};

Html.propTypes = {
    title: React.PropTypes.object,
    markup: React.PropTypes.string.isRequired,
    state: React.PropTypes.string.isRequired
};

module.exports = Html;
