import tape from 'tape'
import _test from '../'
const test = _test(tape)

test('ensure that regular tape functions are present', (t) => {
  t.equals(typeof test.skip, 'function', 'skip is a function')
  t.equals(typeof test.only, 'function', 'only is a function')
  t.equals(typeof test.createStream, 'function', 'createStream is a function')
  t.equals(typeof test.createHarness, 'function', 'createHarness is a function')
  t.end()
})
