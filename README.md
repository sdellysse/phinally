# phinally: a implementation-agnostic `finally` for ES2015+

This module is meant to be used in a runtime that uses the '::' "function-bind"
operator. If you're using Babel consult the babel docs for enabling it
[here](http://babeljs.io/docs/plugins/syntax-function-bind/). Make sure to
enable both the `syntax` plugin and the `transform` plugin.

## Usage

```javascript
const phinally = require("phinally");

const pseudoCount = acquireDatabaseHandle()
.then(handle => Promise.resolve()
    .then(() => handle.queryOne("SELECT count(*) FROM foo")
    .then(count => (100 / count)) // what if count === 0?
    ::phinally(() => handle.dispose())
);
```

In the above example, `handle.dispose()` will always run. If there were no
rejections, the value passed into phinally from the chain will be the return
value of phinally. If there was an error, phinally will re-reject the error for
later handling.
