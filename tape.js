// tape is not a dependency of test-promise and must therefore be
// added as a dependency by the user project.
module.exports = require('./').default(require('tape'))
