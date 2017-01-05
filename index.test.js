var checkmate = require('./index')

describe('checkmate()', () => {
  const checkers = checkmate({
    email: {
      notEmpty(str) { return str && str.length > 0 },
      containsAt(str) { return str && str.indexOf('@') > -1 },
    },
    password: {
      minLength(str) { return str && str.length >= 8 },
      truthy(str) { return !!str },
    },
  })

  it('returns an empty null when there is no error', () => {
    const errors = checkers({ email: 'arnaud@efounders.com', password: 'password' })
    expect(errors).toEqual(null)
  })

  it('returns an object with the keys of falty values', () => {
    const errors = checkers({ email: 'arnaudefounders.com', password: 'password' })
    expect(errors.email).toBeDefined()
  })

  it('returns all the errors key for all the values', () => {
    const errors = checkers({ email: null, password: false })
    expect(errors).toEqual({
      email: ['notEmpty', 'containsAt'],
      password: ['minLength', 'truthy']
    })
  })
})
