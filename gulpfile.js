var requireDir = require('require-dir');


process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PLATFORM_ID = process.env.PLATFORM_ID || '1';

requireDir('./gulp/tasks');