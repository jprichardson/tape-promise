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

function tapePromiseFactory(tapeTest) {
  function testPromise(description, testFn) {
    tapeTest(description, function (t) {
      t.end = (0, _onetime2.default)(t.end);
      process.once('unhandledRejection', t.end);
      try {
        var p = testFn(t);
        if ((0, _isPromise2.default)(p)) p.then(function () {
          return t.end();
        }, t.end);
      } catch (e) {
        t.end(e);
      } finally {
        process.removeListener('unhandledRejection', t.end);
      }
    });
  }

  Object.keys(tapeTest).forEach(function (key) {
    if (typeof tapeTest[key] !== 'function') return;
    testPromise[key] = tapeTest[key];
  });

  return testPromise;
}
