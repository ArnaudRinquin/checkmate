import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserForm from './UserForm'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-content">
          <UserForm onSubmit={(user) => this.setState({ user })}/>
          {this.state.user && <pre>
            { JSON.stringify(this.state.user, null, 2) }
          </pre>}
        </div>
      </div>
    );
  }
}

export default App;
