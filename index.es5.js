'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = tapePromiseFactory;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _onetime = require('onetime');

var _onetime2 = _interopRequireDefault(_onetime);

function tapePromiseFactory(tapeTest) {
  function testPromise(description, testFn) {
    tapeTest(description, function (t) {
      t.end = (0, _onetime2['default'])(t.end);
      process.once('unhandledRejection', t.end);
      var p;
      try {
        p = testFn(t);
        if (p && p.then && typeof p.then === 'function') {
          p.then(function () {
            return t.end();
          })['catch'](t.end);
        }
      } catch (e) {
        t.end(e);
      }
    });
  }

  Object.keys(tapeTest).forEach(function (key) {
    if (typeof tapeTest[key] !== 'function') return;
    testPromise[key] = tapeTest[key];
  });

  return testPromise;
}

module.exports = exports['default'];
