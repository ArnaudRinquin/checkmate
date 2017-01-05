module.exports = (validations) => {

  const checkers = Object.keys(validations)
    .map(valueKey => ({ valueKey, valueChecks: validations[valueKey] }))
    .reduce((validators, { valueKey, valueChecks }) => {

      return validators.concat(
        Object.keys(valueChecks)
          .map(checkKey => ({ checkKey, checkFunction: valueChecks[checkKey] }))
          .reduce((validators, { checkKey, checkFunction }) => {
            return validators.concat(
              function(errors, values) {
                const result = checkFunction(values[valueKey])
                if (result) return errors
                return Object.assign({}, errors, {
                  [valueKey]: [].concat((errors||{})[valueKey] || [], checkKey)
                })
              }
            )
          }, [])
      )
    }, [])

  return (values) => checkers.reduce((errors, checker) => {
    return checker(errors, values)
  }, null)
}
