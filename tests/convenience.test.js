var test = require('tape')
test('convenience import', function (t) {
  var wrapped = require('../tape')
  t.equals(typeof wrapped.skip, 'function', 'skip is a function')
  t.end()
})
