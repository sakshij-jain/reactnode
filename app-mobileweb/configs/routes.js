var showChat = require('../../app-core/actions/showChat');
var openThread = require('../../app-core/actions/openThread');

module.exports = {
    home: {
        path: '/',
        method: 'get',
        action: function (context, payload, done) {
            context.executeAction(showChat, {}, done);
        }
    },
    assetTypes: {
        path: '/asset-types',
        method: 'get',
        action: function (context, payload, done) {
            context.executeAction(showChat, {}, done);
        }
    },
    thread: {
        path: '/thread/:id',
        method: 'get',
        action: function (context, payload, done) {
            var threadID = payload.params.id;
            context.executeAction(showChat, { threadID: threadID }, function() {
                context.executeAction(openThread, { threadID: threadID }, function() {
                    done();
                })
            });
        }
    }
};
