import * as React from 'react'
import {Signout, Signin} from './user/components'
import {BrowserRouter} from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'

import './App.css'

class App extends React.Component {
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
          <Signin />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
