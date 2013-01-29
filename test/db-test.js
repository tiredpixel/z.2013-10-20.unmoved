'use strict';

var vows   = require('vows');
var assert = require('assert');

vows.describe('db').addBatch({
  'export': {
    'when REDIS_URL set': {
      topic: function () {
        // This need not be a valid connection.
        return require('./../db')({
          REDIS_URL: "redis://example.com:1234/15"
        });
      },
      'should be a RedisClient': function (db) {
        assert.equal('RedisClient', db.constructor.name);
      },
      'should set host': function (db) {
        assert.equal('example.com', db.host);
      },
      'should set port': function (db) {
        assert.equal(1234, db.port);
      }
    },
    'when REDIS_URL unset': {
      topic: function () {
        // This need not be a valid connection.
        return require('./../db')({});
      },
      'should be a RedisClient': function (db) {
        assert.equal('RedisClient', db.constructor.name);
      },
      'should default host to localhost': function (db) {
        assert.equal('localhost', db.host);
      },
      'should default port to 6379': function (db) {
        assert.equal(6379, db.port);
      }
    },
    'with test config': {
      topic: function () {
        var config = require('./../config')(process.env)
        
        return require('./../db')(config);
      },
      'calling PING': {
        topic: function (db) {
          db.ping(this.callback);
        },
        'should return PONG': function (err, value) {
          assert('PONG', value);
        }
      }
    }
  }
}).export(module);
