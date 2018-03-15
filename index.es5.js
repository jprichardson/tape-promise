'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = tapePromiseFactory;

var _onetime = require('onetime');

var _onetime2 = _interopRequireDefault(_onetime);

var _isPromise = require('is-promise');

var _isPromise2 = _interopRequireDefault(_isPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// From: https://github.com/substack/tape/blob/17276d7473f9d98e37bab47ebdddf74ca1931f43/lib/test.js#L24
// Modified only for linting
var getTestArgs = function getTestArgs(name_, opts_, cb_) {
  var name = '(anonymous)';
  var opts = {};
  var cb = void 0;

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    var t = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);
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

function tapePromiseFactory(tapeTest) {
  function testPromise() {
    var _getTestArgs = getTestArgs.apply(undefined, arguments),
        name = _getTestArgs.name,
        opts = _getTestArgs.opts,
        cb = _getTestArgs.cb;

    tapeTest(name, opts, function (t) {
      t.end = (0, _onetime2.default)(t.end);
      process.once('unhandledRejection', t.end);
      try {
        var p = cb(t);
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
    if (key === 'only') {
      testPromise[key] = tapePromiseFactory(tapeTest[key]);
    } else {
      testPromise[key] = tapeTest[key];
    }
  });

  return testPromise;
}
