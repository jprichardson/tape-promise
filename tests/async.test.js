import tape from 'tape'
import _test from '../'
const test = _test(tape)

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time))

test('ensure async works', async (t) => {
  await delay(100)
  t.true(true)
  t.end()
})
