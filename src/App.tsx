import * as React from 'react'
import {auth, User} from 'firebase'
import {Signout} from './user/components'
import {BrowserRouter, Route} from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import AppContent from './AppContent'
import {connect, Dispatch} from 'react-redux'
import {SignedUp, signedUp} from './user/actions'

import './App.css'

interface Props {
  dispatch: Dispatch<SignedUp>
}

class App extends React.Component {
  props: Props
  unregisterAuthObserver: Function

  constructor (props: Props) {
    super(props)
    this.unregisterAuthObserver = auth().onAuthStateChanged(
      (user: User | null) => {
        this.props.dispatch(signedUp(user))
      }
    )
  }

  componentWillUnmount () {
    this.unregisterAuthObserver()
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <AppBar position='static'>
            <Toolbar style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <IconButton color='inherit' aria-label='Menu'>
                  <MenuIcon />
                </IconButton>
                <Typography variant='title' color='inherit'>
                  Net bet
                </Typography>
              </div>
              <Signout />
            </Toolbar>
          </AppBar>
          <Route path='*' component={AppContent} />
        </div>
      </BrowserRouter>
    )
  }
}

export default connect()(App)
