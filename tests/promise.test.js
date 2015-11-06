import tape from 'tape'
import _test from '../'
const test = _test(tape)

function delay (time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve()
    }, time)
  })
}

test('ensure promises works', function (t) {
  return delay(100).then(function () {
    t.true(true)
  })
})
