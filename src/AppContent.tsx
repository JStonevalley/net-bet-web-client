import * as React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect, Dispatch} from 'react-redux'
import {State} from './combineReducers'
import {Signin} from './user/components'
import {Content} from './publicContent/components/Content'

interface StateProps {
  signedIn: Boolean | null
}

interface DispatchProp {
  dispatch: Dispatch<any>
}

const PrivateRoute = connect<StateProps, DispatchProp, any>(
  (state: State) => ({signedIn: state.user.signedIn})
)(({component: Component, signedIn, ...rest}: any) => {
  if (signedIn === null) {
    return null
  }
  return (
    <Route
      {...rest}
      render={props =>
        signedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
})

export default () => {
  return (
    <div>
      <Signin />
      <PrivateRoute path='/' component={Content} />
    </div>
  )
}
