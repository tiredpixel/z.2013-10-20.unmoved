'use strict';

var assert = require('assert');

describe('config', function () {
  var config;
  
  describe('with env variables set', function () {
    beforeEach(function () {
      config = require('./../config')({
        PORT:             "TEST_PORT",
        REDIS_URL:        "TEST_REDIS_URL",
        REDIS_KEY_PREFIX: "TEST_REDIS_KEY_PREFIX",
        REMOTE_HOST:      "TEST_REMOTE_HOST"
      });
    });
    
    it('should set PORT', function () {
      assert.equal(config.PORT, "TEST_PORT");
    });
    
    it('should set REDIS_URL', function () {
      assert.equal(config.REDIS_URL, "TEST_REDIS_URL");
    });
    
    it('should set REDIS_KEY_PREFIX', function () {
      assert.equal(config.REDIS_KEY_PREFIX, "TEST_REDIS_KEY_PREFIX");
    });
    
    it('should set REMOTE_HOST', function () {
      assert.equal(config.REMOTE_HOST, "TEST_REMOTE_HOST");
    });
  });
  
  describe('with env variables unset', function () {
    beforeEach(function () {
      config = require('./../config')({});
    });
    
    it('should default PORT to 3000', function () {
      assert.equal(config.PORT, 3000);
    });
    
    it('should default REDIS_KEY_PREFIX to unmoved:', function () {
      assert.equal(config.REDIS_KEY_PREFIX, "unmoved:");
    });
  });
});
