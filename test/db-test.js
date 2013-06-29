'use strict';

var assert = require('assert');

describe('db', function () {
  var db;
  
  describe('with REDIS_URL set', function () {
    beforeEach(function () {
      // This need not be a valid connection.
      db = require('./../db')({
        REDIS_URL: "redis://example.com:1234/15"
      });
    });
    
    it('should be a RedisClient', function () {
      assert.equal(db.constructor.name, 'RedisClient');
    });
    
    it('should set host', function () {
      assert.equal(db.host, 'example.com');
    });
    
    it('should set port', function () {
      assert.equal(db.port, 1234);
    });
  });
  
  describe('with REDIS_URL unset', function () {
    beforeEach(function () {
      // This need not be a valid connection.
      db = require('./../db')({});
    });
    
    it('should be a RedisClient', function () {
      assert.equal(db.constructor.name, 'RedisClient');
    });
    
    it('should set host', function () {
      assert.equal(db.host, 'localhost');
    });
    
    it('should set port', function () {
      assert.equal(db.port, 6379);
    });
  });
  
  describe('with test config', function () {
    beforeEach(function () {
      var config = require('./../config')(process.env);
      
      db = require('./../db')(config);
    });
    
    it('should PING-PONG', function (done) {
      db.ping(function (err, value) {
        if (err) return done(err);
        
        assert(value, 'PONG');
        
        done();
      });
    });
  });
});
