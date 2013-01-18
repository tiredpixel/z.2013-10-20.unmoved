/**
 * config
 *
 * This sets up default values. The contents of this file should not be changed
 * for installation; rather, environment variables should be set. An example
 * .env, suitable for use with foreman, is provided to assist in development.
 */

module.exports = {
  // NODE_ENV is also used, but not stored within config
  'PORT'             : process.env.PORT             || 3000,
  'REDIS_URL'        : process.env.REDIS_URL,
  'REDIS_KEY_PREFIX' : process.env.REDIS_KEY_PREFIX || 'unmoved:',
  'REMOTE_HOST'      : process.env.REMOTE_HOST,
}
