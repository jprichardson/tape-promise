import onetime from 'onetime'

export default function tapePromiseFactory (tapeTest) {
  function testPromise (description, testFn) {
    tapeTest(description, function (t) {
      t.end = onetime(t.end)
      process.once('unhandledRejection', t.end)
      var p
      try {
        p = testFn(t)
        if (p && p.then && typeof p.then === 'function') {
          p.then(() => t.end()).catch(t.end)
        }
      } catch (e) {
        t.end(e)
      }
    })
  }

  Object.keys(tapeTest).forEach((key) => {
    if (typeof tapeTest[key] !== 'function') return
    testPromise[key] = tapeTest[key]
  })

  return testPromise
}
