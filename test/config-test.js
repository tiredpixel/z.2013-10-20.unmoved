'use strict';

var vows   = require('vows');
var assert = require('assert');

vows.describe('config').addBatch({
  'export': {
    'when PORT set': {
      topic: function () {
        return require('./../config')({
          PORT: "TEST_PORT"
        });
      },
      'should set PORT': function (config) {
        assert.equal(config.PORT, "TEST_PORT");
      },
    },
    'when PORT unset': {
      topic: function () {
        return require('./../config')({});
      },
      'should default PORT to 3000': function (config) {
        assert.equal(config.PORT, 3000);
      },
    },
    'when REDIS_URL set': {
      topic: function () {
        return require('./../config')({
          REDIS_URL: "TEST_REDIS_URL"
        });
      },
      'should set REDIS_URL': function (config) {
        assert.equal(config.REDIS_URL, "TEST_REDIS_URL");
      },
    },
    'when REDIS_KEY_PREFIX set': {
      topic: function () {
        return require('./../config')({
          REDIS_KEY_PREFIX: "TEST_REDIS_KEY_PREFIX"
        });
      },
      'should set REDIS_KEY_PREFIX': function (config) {
        assert.equal(config.REDIS_KEY_PREFIX, "TEST_REDIS_KEY_PREFIX");
      },
    },
    'when REDIS_KEY_PREFIX unset': {
      topic: function () {
        return require('./../config')({});
      },
      'should default REDIS_KEY_PREFIX to unmoved:': function (config) {
        assert.equal(config.REDIS_KEY_PREFIX, "unmoved:");
      },
    },
    'when REMOTE_HOST set': {
      topic: function () {
        return require('./../config')({
          REMOTE_HOST: "TEST_REMOTE_HOST"
        });
      },
      'should set REMOTE_HOST': function (config) {
        assert.equal(config.REMOTE_HOST, "TEST_REMOTE_HOST");
      }
    }
  }
}).export(module);
