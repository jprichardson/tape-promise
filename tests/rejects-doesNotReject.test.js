import tape from 'tape'
import _test from '../'
const test = _test(tape)

async function reject () {
  return new Promise((resolve, reject) => setTimeout(reject(new Error('rejected')), 100))
}

async function resolve () {
  return new Promise(resolve => setTimeout(resolve, 100))
}

test('t.rejects with promise input', async (t) => {
  await t.rejects(reject(), /Error: rejected/)
})

test('t.rejects with function input', async (t) => {
  await t.rejects(reject, /Error: rejected/)
})

test('t.doesNotReject with promise input', async (t) => {
  await t.doesNotReject(resolve())
})

test('t.doesNotReject with function input', async (t) => {
  await t.doesNotReject(resolve)
})
