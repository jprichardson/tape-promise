import tape from 'tape'
import _test from '../'
const test = _test(tape)

test.only('ensure that regular test.only works', (t) => {
  t.true(true)
  t.end()
})

test('this should never run', (t) => {
  t.fail()
})
