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

test('ensure async works', async function (t) {
  await delay(100)
  t.true(true)
  t.end()
})
