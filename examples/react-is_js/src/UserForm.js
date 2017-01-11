import React, { Component } from 'react'
import checkmate from 'checkmate'
import is from 'is_js'
import './UserForm.css'

const checkers = checkmate({
  displayName: {
    notNull: (str) => !is.empty(str),
  },
  email: {
    isEmail: is.email,
  },
  password: {
    minLength: (str) => str && str.length > 7,
    notPassword: (str) => str !== 'password',
  }
})

const errorMessages = {
  notNull: 'Should not be empty',
  isEmail: 'Must be a valid email',
  minLength: 'Your password must be at least 8 characters long',
  notPassword: 'Your password can not be "password"',
}

function Errors({ errorMessages, errors, fieldName }) {
  if (!errors || !errors[fieldName]) return null
  return <div>
    <ul>
      { errors[fieldName].map((errorType) => <li key={errorType}>
        { errorMessages[errorType] }
      </li>) }
    </ul>
  </div>
}

export default class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: '',
      email: '',
      password: '',
    }
  }
  render() {
    const errors = checkers(this.state)

    return (
      <form className="UserForm" onSubmit={ errors ? null : this.submitForm}>
        <div>
          <label htmlFor='displayName'>Display name</label>
          <input id='displayName' value={this.state.displayName} onChange={this.updateDisplayName}/>
          <Errors errors={errors} errorMessages={errorMessages} fieldName='displayName'/>
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input id='email' value={this.state.email} onChange={this.updateEmail}/>
          <Errors errors={errors} errorMessages={errorMessages} fieldName='email'/>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input id='password' value={this.state.password} onChange={this.updatePassword}/>
          <Errors errors={errors} errorMessages={errorMessages} fieldName='password'/>
        </div>
        <input disabled={errors} type='submit'/>
      </form>
    );
  }

  submitForm = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  updateDisplayName = (e) => this.setState({ displayName: e.target.value })
  updateEmail = (e) => this.setState({ email: e.target.value })
  updatePassword = (e) => this.setState({ password: e.target.value })
}
