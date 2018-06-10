import * as React from 'react'
import {Signout, Signin, withAuthListener} from './user/components'
import {BrowserRouter, Route} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import {Content} from './Content'
import {connect} from 'react-redux'

import './App.css'

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Scafolding />
      </BrowserRouter>
    )
  }
}

const Scafolding = withAuthListener(() => {
  return <div>
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
        <Signin />
        <Signout />
      </Toolbar>
    </AppBar>
    <Route path='*' component={Content} />
  </div>
})

export default connect()(App)
