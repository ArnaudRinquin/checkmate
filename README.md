# checkmate

[![Build Status](https://travis-ci.org/ArnaudRinquin/checkmate.svg?branch=master)](https://travis-ci.org/ArnaudRinquin/checkmate)

Checkmate is a very simple data validator.

*Use cases*

* form input validation
* model validation

*Characteristics*

* no dependency
* framework / lib / context agnostic: describe what you expect → send an object → get errors
* does not come with validation functions, write your own or combine with libraries such as [`is.js`](http://is.js.org/)

*Example*

See the [`react + is_js`](./examples/react-is_js) example.

```js
import checkmate from 'checkmate'
import is from 'is_js'

const checkers = checkmate({
  email: {
    notEmpty: (str) => !is.empty(str),
    isEmail: is.email,
  },
  password: {
    truthy: (str) => !!str,
    minLength: (str) => str && str.length > 7,
  },
})

const errors = checkers({
  email: 'arnaud@efounderscom',
  password: false,
})

console.log(errors)

// → { email: ['isEmail'], password: ['truthy'] }
```
