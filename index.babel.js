import onetime from 'onetime'
import isPromise from 'is-promise'

// From: https://github.com/substack/tape/blob/17276d7473f9d98e37bab47ebdddf74ca1931f43/lib/test.js#L24
// Modified only for linting
const getTestArgs = function (name_, opts_, cb_) {
  let name = '(anonymous)'
  let opts = {}
  let cb

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i]
    var t = typeof arg
    if (t === 'string') {
      name = arg
    } else if (t === 'object') {
      opts = arg || opts
    } else if (t === 'function') {
      cb = arg
    }
  }
  return { name, opts, cb }
}

function registerNewAssertions (Test) {
  Test.prototype.rejects = function (promise, expected, message = 'should reject', extra) {
    if (typeof promise === 'function') promise = promise()
    return promise
      .then(() => {
        this.throws(() => {}, expected, message, extra)
      })
      .catch(err => {
        this.throws(() => { throw err }, expected, message, extra)
      })
      .then(() => {}) // resolve on failure to not stop execution (assertion is still failing)
  }

  Test.prototype.doesNotReject = function (promise, expected, message = 'should resolve', extra) {
    if (typeof promise === 'function') promise = promise()
    return promise
      .then(() => {
        this.doesNotThrow(() => {}, expected, message, extra)
      })
      .catch(err => {
        this.doesNotThrow(() => { throw err }, expected, message, extra)
      })
      .then(() => {}) // resolve on failure to not stop execution (assertion is still failing)
  }
}

export default function tapePromiseFactory (tapeTest) {
  const Test = tapeTest.Test
  // when tapeTest.only() is passed in, Test will be undefined
  if (Test) registerNewAssertions(Test)

  function testPromise (...args) {
    const { name, opts, cb } = getTestArgs(...args)
    tapeTest(name, opts, function (t) {
      t.end = onetime(t.end)

      let plan = false
      const setPlan = () => { plan = true }
      t.once('plan', setPlan)

      process.once('unhandledRejection', t.end)
      try {
        const p = cb(t)
        if (isPromise(p) && !plan) p.then(() => t.end(), t.end)
      } catch (e) {
        t.end(e)
      } finally {
        process.removeListener('unhandledRejection', t.end)
        t.removeListener('plan', setPlan)
      }
    })
  }

  Object.keys(tapeTest).forEach((key) => {
    if (typeof tapeTest[key] !== 'function') return
    if (key === 'only') {
      testPromise[key] = tapePromiseFactory(tapeTest[key])
    } else {
      testPromise[key] = tapeTest[key]
    }
  })

  return testPromise
}
