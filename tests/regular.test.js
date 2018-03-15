import tape from 'tape'
import _test from '../'
const test = _test(tape)

test('ensure that regular test functions still work', (t) => {
  t.true(true)
  t.end()
})

test('ensure that regular test functions with options still work', {}, (t) => {
  t.true(true)
  t.end()
})

test((t) => {
  t.true('ensure that anonymous test functions work')
  t.end()
}, 'ensure that regular test functions with swapped args still work', {})

test((t) => {
  t.true('ensure that anonymous test functions work')
  t.end()
})
