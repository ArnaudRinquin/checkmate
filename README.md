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

```js
import is from 'is_js'

const checkers = checkmate({
  email: {
    notEmpty(str) { return str && str.length > 0 },
    isEmail(str) { return is.email(str) }
  },
  password: {
    truthy(str) { return !!str },
    minLength(str) { return str && str.length >= 8 },
  },
})

const errors = checkers({
  email: 'arnaud@efounderscom',
  password: false,
})

console.log(errors)

// → { email: ['isEmail'], password: ['truthy'] }
```
