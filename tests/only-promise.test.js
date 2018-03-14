import tape from 'tape'
import _test from '../'
const test = _test(tape)

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time))

test.only('ensure that promise-based test.only works', (t) => {
  return delay(100).then(() => t.true(true))
})

test('this should never run', (t) => {
  t.fail()
})
