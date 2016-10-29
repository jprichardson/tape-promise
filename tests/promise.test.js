import tape from 'tape'
import _test from '../'
const test = _test(tape)

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time))

test('ensure promises works', (t) => {
  return delay(100).then(() => t.true(true))
})
