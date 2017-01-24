var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var shell = require('shelljs');
var setNodeEnv = require('../../server/server-utils/set-node-env');

var config = require('../../webpack/webpack.config');

gulp.task('mobileweb:serve', ['set-env:dev', 'webpack:dev-mobileweb-server']);
gulp.task('mobileweb:serve-qa', ['set-env:qa', 'webpack:dev-mobileweb-server']);
gulp.task('mobileweb:serve-prod', ['set-env:production', 'webpack:dev-mobileweb-server']);


gulp.task("webpack:dev-mobileweb-server", function(callback) {

    // Setting Platform Id
    process.env.PLATFORM_ID = 2;

    var paramsForPlatform = setNodeEnv.getParamsForPlatform(require('../../env-configs/.env-local.json'));

    // Setting Env Variables
    Object.assign(process.env, paramsForPlatform);

    // Start a webpack-dev-server
    var compiler = webpack(config);

    new WebpackDevServer(compiler, {
        publicPath: config.output.publicPath,
        hot: true,
        historyApiFallback: true,
        quiet: true,
        proxy: {
            '*': { target: `http://localhost:${Number(paramsForPlatform.PORT) + 1}` }
        }
    }).listen(paramsForPlatform.PORT, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", `http://localhost:${paramsForPlatform.PORT}/webpack-dev-server/`);

        if (err) throw new gutil.PluginError("webpack-dev-server", err);

        Object.assign(shell.env, paramsForPlatform);

        shell.env.PORT = Number(paramsForPlatform.PORT) + 1;

        shell.exec('"./node_modules/.bin/nodemon" start.js -e js,jsx', function () {
        });

    });
});