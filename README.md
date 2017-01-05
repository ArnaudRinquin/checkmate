# checkmate

[![Build Status](https://travis-ci.org/ArnaudRinquin/checkmate.svg?branch=master)](https://travis-ci.org/ArnaudRinquin/checkmate)

Checkmate is a very simple data validator.

*Use cases*

* form input validation
* model validation

*Characteristics*

* no dependency
* framework / lib / context agnostic: describe what you expect → send an object → get errors

*Example*

```js
const checkers = checkmate({
  email: {
    notEmpty(str) { return str && str.length > 0 },
    containsAt(str) { return str && str.indexOf('@') > -1 },
    containsDot(str) { return str && str.indexOf('.') > -1 },
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

// → { email: ['containsAt', 'containsDot'], password: ['truthy'] }
```
