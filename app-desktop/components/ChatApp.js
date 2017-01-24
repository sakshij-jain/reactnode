/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';
var React = require('react');
var provideContext = require('fluxible-addons-react/provideContext');
var handleHistory = require('fluxible-router').handleHistory;
var Header = require('../components/header/Header').default;

var ChatApp = React.createClass({
    render: function() {
        const { currentRoute, currentNavigateError } = this.props;
        const routeNotFound = !!currentNavigateError && currentNavigateError.statusCode === 404;
        const Handler = currentRoute && currentRoute.handler();

        let content = null;

        if (routeNotFound) {
            content = (<div>Loading</div>);
        } else if (currentNavigateError) {
            // Generic error, usually always with statusCode 500
            content = (<div>error</div>);
        } else if (!Handler) {
            // No handler: this is another case where a route is not found (e.g.
            // is not defined in the routes.js config)
            content = (<div>route not found</div>);
        } else {
            // Here you go with the actual page content
            const { params, query } = currentRoute;
            content = <Handler {...query} {...params} />;
        }

        return (
            <div className="container">
                <Header/>
                <div className="content" style={{ marginTop: 0 }}>{content}</div>
                <div id="modals"></div>
                {/*<ThreadSection />*/}
                {/*<MessageSection />*/}
            </div>
        );
    }
});

// wrap with history handler
ChatApp = handleHistory(ChatApp);

// and wrap that with context
ChatApp = provideContext(ChatApp);

module.exports = ChatApp;
