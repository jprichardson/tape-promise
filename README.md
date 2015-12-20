tape-promise
============

[![build status](https://api.travis-ci.org/jprichardson/tape-promise.svg)](http://travis-ci.org/jprichardson/tape-promise)

Promise and ES2016 (ES7) `async/await` support for [Tape](https://github.com/substack/tape).

This module assumes that you're familiar with at least the concepts of Promises
and if you want to use `async/await`, then you must be familiar with [Babel](https://babeljs.io/).

Install
-------

    npm i --save-dev tape-promise


Usage
-----

Make sure that you have `tape` installed:

    npm i --save-dev tape

Unlike [`blue-tape`](https://www.npmjs.com/package/blue-tape), `tape-promise` is
just a decorator (not an ES7 decorator). That is, it does NOT depend upon `tape`
and requires that you pass it in.

### ES5

```js
var tape = require('tape')
var _test = require('tape-promise')
var test = _test(tape) // decorate tape
```

### ES6 (ES2015)

```js
import tape from 'tape'
import _test from 'tape-promise'
const test = _test(tape) // decorate tape
```

or, for convenience...

```js
import test from 'tape-promise/tape'
```

but you must explicitly have `tape` as a dependency.


### Example (promises)

Just return the promise.

```js
// example function that returns a Promise
function delay (time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve()
    }, time)
  })
}

test('ensure promises works', function (t) {
  return delay(100).then(function () {
    t.true(true)
  })
})
```

### Example (async/await)

Async/await functions just transform to Promises.
Don't forget to put the `async` keyword on your function.

```js
// example function that returns a Promise
// it could also be an async function
function delay (time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve()
    }, time)
  })
}

// NOTICE 'async'?
test('ensure async works', async function (t) {
  await delay(100)
  t.true(true)
  t.end() // not really necessary
})
```

### Example (normal tape tests)

Of course you can write normal tape tests as you would.

```js
test('ensure that regular test functions still work', function (t) {
  t.true(true)
  t.end()
})
```

License
-------

Licensed under MIT

Copyright (c) [JP Richardson](https://github.com/jprichardson)
