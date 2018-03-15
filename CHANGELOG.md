3.0.0 / 2018-03-15
------------------
- Drop Node.js 4 & 5 support; Node 6 is now the minimum version
- Add support for argument swapping, tape options, and support `test.only()` [#12](https://github.com/jprichardson/tape-promise/pull/12)
- Update babel config

2.0.1 / 2016-11-28
------------------
- Babel6 upgrade on `require('tape-promise/tape')`

2.0.0 / 2016-10-29
------------------
- babel upgrade (breaking for ES5 commonjs)
- fix [#5]

1.1.0 / 2015-12-19
------------------
- Conveniently import tape/tape-promise. See: https://github.com/jprichardson/tape-promise/pull/2

1.0.1 / 2015-11-26
------------------
- Resolved promise values were passed `t.end()`, resolving as an error. See: https://github.com/jprichardson/tape-promise/pull/1

1.0.0 / 2015-11-06
------------------
- initial release
