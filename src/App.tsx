import * as React from 'react'
import {connect} from 'react-redux'
import {User} from './user/types'
import {State} from './combineReducers'
import './App.css'

const logo = require('./logo.svg')

interface SignUpProps {
  user: User
}

let SignUp = ({user}: SignUpProps) => {
  return <span>{user && user.firstName || 'No user :('}</span>
}

const ConnectedSignUp = connect((state: State) => ({
  user: state.user.user
}))(SignUp)

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <ConnectedSignUp />
      </div>
    )
  }
}

export default App
