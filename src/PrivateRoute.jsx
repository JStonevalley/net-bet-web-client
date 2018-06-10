import * as React from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import Typography from '@material-ui/core/Typography'
import {compose, branch, renderNothing} from 'recompose'
import {Signin} from './user/components'

const LoginRequiredInfo = () => {
  return <div style={{display: 'flex', marginTop: '5rem'}}>
    <Typography variant='headline'>
      You need to sign in: <Signin />
    </Typography>
  </div>
}

export const PrivateRoute = compose(
  connect(
    (state) => ({
      signedIn: state.user.signedIn,
      authLoaded: state.user.authLoaded
    })
  ),
  branch(
    ({authLoaded}) => !authLoaded,
    renderNothing
  )
)(({component: Component, signedIn, authLoaded, ...rest}) => {
  return <Route
    {...rest}
    render={(props) => {
      return signedIn
        ? <Component {...props} />
        : <LoginRequiredInfo />
    }}
  />
})
