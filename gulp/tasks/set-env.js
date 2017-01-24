'use strict';

const gulp = require('gulp');
const fs = require('fs');
const merge = require('deepmerge');
const del = require('del');
const request = require('request');
const difference = require('lodash').difference;
const colors = require('colors');


const TEMPLATE_CONFIG_FILENAME = './env-configs/env-default.json';
const LOCAL_CONFIG_FILENAME = './env-configs/.env-local.json';
const PRODUCTION_CONFIG_FILENAME = './env-configs/.env-release.json';



/*
 * This task creates 2 files in the root folder :
 * .env-local.json
 * Which is composed of env-default.json (base) and the specified environment (QA1, QA2, QA3, PROD)
 * This is used by the app when NODE_ENV=development. For development use only.
 *
 * .env-release.json
 * Which is composed of env-default.json (base) and env-prod.json
 * This is used by the app when NODE_ENV=production.
 */


function jsonFromFile(filename) {
    try {
        return JSON.parse(fs.readFileSync(filename));
    } catch (e) {
        throw new Error('Looks like there is an error in [' + filename + ']. Make sure it\'s formatted correctly.');
    }
}

function getTemplate() {
    return jsonFromFile(TEMPLATE_CONFIG_FILENAME);
}

function writeToFile(config, filename) {
    vaildateMerge(config);
    fs.writeFileSync(filename, JSON.stringify(config, null, 2));
}

function hasLocalConfig() {
    return fs.existsSync(LOCAL_CONFIG_FILENAME);
}

function vaildateMerge(config) {
    const template = getTemplate();
    const templatePlaforms = Object.keys(template.PLATFORMS);
    const environmentPlatforms = Object.keys(config.PLATFORMS);

    if (difference(environmentPlatforms, templatePlaforms).length > 0) {
        throw new Error(`PlatformId mismatch. .env-local.json contains more plaforms than the template. Try running gulp set-env:clean before setting environment`);
    }
}

function removeAll() {
    del([LOCAL_CONFIG_FILENAME, PRODUCTION_CONFIG_FILENAME]);
}

function getConfigForEnvironment(environment) {
    let config = null;

    if (!environment) {
        throw new Error('Missing environment parameter.');
    }

    switch (environment.toLowerCase()) {
        case 'development':
            config = jsonFromFile(TEMPLATE_CONFIG_FILENAME);
            break;
        case 'qa':
            config = jsonFromFile('./env-configs/env-qa.json');
            break;
        case 'production':
            config = jsonFromFile('./env-configs/env-prod.json');
            break;
    }

    return config;
}

function buildRelease() {
    const productionConfig = getConfigForEnvironment('production');
    const template = getTemplate();
    const config = merge(template, productionConfig);
    writeToFile(config, PRODUCTION_CONFIG_FILENAME);
}

function setEnvironment(environment, mode) {
    const fileExists = hasLocalConfig();
    const template = getTemplate();
    const environmentConfig = getConfigForEnvironment(environment);
    let config = null;
    config = merge(template, environmentConfig);
    writeToFile(config, LOCAL_CONFIG_FILENAME);
    buildRelease();
}

gulp.task('set-env', function (done) {
    if (hasLocalConfig()) {
        return done();
    }
    // TODO Add better desciption on how config is built and consumed.

    // Default to development if .env-local.json doesn't exist
    // Run individual gulp tasks `gulp set-env:qa1` to override local config
    setEnvironment('development');
});

/* Set local configuration to certain environment */
gulp.task('set-env:dev', () => {
    setEnvironment('DEVELOPMENT');
});
gulp.task('set-env:qa', () => {
    setEnvironment('QA');
});
gulp.task('set-env:production', () => {
    setEnvironment('PRODUCTION');
});

/* Delete config dot files */
gulp.task('set-env:clean', [], function () {
    removeAll();
});
