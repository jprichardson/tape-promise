import onetime from 'onetime'
import isPromise from 'is-promise'

export default function tapePromiseFactory (tapeTest) {
  function testPromise (description, testFn) {
    tapeTest(description, function (t) {
      t.end = onetime(t.end)
      process.once('unhandledRejection', t.end)
      try {
        const p = testFn(t)
        if (isPromise(p)) p.then(() => t.end(), t.end)
      } catch (e) {
        t.end(e)
      } finally {
        process.removeListener('unhandledRejection', t.end)
      }
    })
  }

  Object.keys(tapeTest).forEach((key) => {
    if (typeof tapeTest[key] !== 'function') return
    testPromise[key] = tapeTest[key]
  })

  return testPromise
}
