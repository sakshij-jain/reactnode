/* eslint-disable */
'use strict';
/* eslint-enable */

function getParamsForEnvironment() {
    try {
        const thinksysEnv = process.env.THINKSYS_ENV.toLowerCase();
        const isQA = thinksysEnv.includes('qa');
        const isDev = thinksysEnv === 'dev';

        if (isDev || isQA) {
            return require('.env-local.json');
        }
    } catch (e) {
        console.log('##############');
        console.log(e.stack);
        console.log('##############');
    }

    // Default to release
    return require('.env-release.json');
}

function getParamsForPlatform(config) {
    return config.PLATFORMS[process.env.PLATFORM_ID];
}

function getCurrentConfiguration() {
    const envParams = getParamsForEnvironment();

    return getParamsForPlatform(envParams);
}

function setNodeEnvironment() {
    if (!process.env.NODE_ENV) {
        throw new Error('Missing NODE_ENV environment variable');
    }

    if (!process.env.PLATFORM_ID) {
        throw new Error('Missing PLATFORM_ID environment variable');
    }

    if (!process.env.MATCH_ENV) {
        throw new Error('Missing THINKSYS_ENV environment variable');
    }

    const platformConfiguration = getCurrentConfiguration();

    // Override api endpoint for CM managed QA builds.
    const apiEndpoint = (process.env.API_ENDPOINT) ? { API_ENDPOINT: process.env.API_ENDPOINT } : {};

    Object.assign(process.env, platformConfiguration, apiEndpoint);
}

exports.getParamsForEnvironment = getParamsForEnvironment;
exports.getParamsForPlatform = getParamsForPlatform;
exports.getCurrentConfiguration = getCurrentConfiguration;
exports.install = setNodeEnvironment;
