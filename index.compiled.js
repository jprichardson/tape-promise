'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tapePromiseFactory;

var _onetime = require('onetime');

var _onetime2 = _interopRequireDefault(_onetime);

var _isPromise = require('is-promise');

var _isPromise2 = _interopRequireDefault(_isPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// From: https://github.com/substack/tape/blob/17276d7473f9d98e37bab47ebdddf74ca1931f43/lib/test.js#L24
// Modified only for linting
const getTestArgs = function getTestArgs(name_, opts_, cb_) {
  let name = '(anonymous)';
  let opts = {};
  let cb;

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    var t = typeof arg;
    if (t === 'string') {
      name = arg;
    } else if (t === 'object') {
      opts = arg || opts;
    } else if (t === 'function') {
      cb = arg;
    }
  }
  return { name: name, opts: opts, cb: cb };
};

function registerNewAssertions(Test) {
  Test.prototype.rejects = function (promise, expected, message = 'should reject', extra) {
    if (typeof promise === 'function') promise = promise();
    return promise.then(() => {
      this.throws(() => {}, expected, message, extra);
    }).catch(err => {
      this.throws(() => {
        throw err;
      }, expected, message, extra);
    }).then(() => {}); // resolve on failure to not stop execution (assertion is still failing)
  };

  Test.prototype.doesNotReject = function (promise, expected, message = 'should resolve', extra) {
    if (typeof promise === 'function') promise = promise();
    return promise.then(() => {
      this.doesNotThrow(() => {}, expected, message, extra);
    }).catch(err => {
      this.doesNotThrow(() => {
        throw err;
      }, expected, message, extra);
    }).then(() => {}); // resolve on failure to not stop execution (assertion is still failing)
  };
}

function tapePromiseFactory(tapeTest) {
  const Test = tapeTest.Test;
  // when tapeTest.only() is passed in, Test will be undefined
  if (Test) registerNewAssertions(Test);

  function testPromise(...args) {
    var _getTestArgs = getTestArgs(...args);

    const name = _getTestArgs.name,
          opts = _getTestArgs.opts,
          cb = _getTestArgs.cb;

    tapeTest(name, opts, function (t) {
      t.end = (0, _onetime2.default)(t.end);

      let plan = false;
      const setPlan = () => {
        plan = true;
      };
      t.once('plan', setPlan);

      process.once('unhandledRejection', t.end);
      try {
        const p = cb(t);
        if ((0, _isPromise2.default)(p) && !plan) p.then(() => t.end(), t.end);
      } catch (e) {
        t.end(e);
      } finally {
        process.removeListener('unhandledRejection', t.end);
        t.removeListener('plan', setPlan);
      }
    });
  }

  Object.keys(tapeTest).forEach(key => {
    if (typeof tapeTest[key] !== 'function') return;
    if (key === 'only') {
      testPromise[key] = tapePromiseFactory(tapeTest[key]);
    } else {
      testPromise[key] = tapeTest[key];
    }
  });

  return testPromise;
}
