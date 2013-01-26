
/**
 * config
 *
 * This sets up default values. The contents of this file should not be changed
 * for installation; rather, environment variables should be set. An example
 * .env, suitable for use with foreman, is provided to assist in development.
 */

module.exports = function (env) {
  'use strict';
  
  return {
    // NODE_ENV is also used, but not stored within config
    'PORT'             : env.PORT             || 3000,
    'REDIS_URL'        : env.REDIS_URL,
    'REDIS_KEY_PREFIX' : env.REDIS_KEY_PREFIX || 'unmoved:',
    'REMOTE_HOST'      : env.REMOTE_HOST
  };
};
