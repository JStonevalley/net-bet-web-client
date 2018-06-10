import React, {Component} from 'react'
import {auth} from 'firebase'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {compose} from 'recompose'
import {signedUp} from '../actions'

export const withAuthListener = (WrappedComponent) => {
  class AuthListener extends Component {
    constructor (props) {
      super(props)
      this.unregisterAuthObserver = auth().onAuthStateChanged(
        (user) => {
          this.props.dispatch(signedUp(user))
          this.props.location.state && this.props.location.state.from && this.props.history.replace(this.props.location.state.from)
        }
      )
    }
  
    componentWillUnmount () {
      console.log('Unregister auth listener', this.unregisterAuthObserver)
      this.unregisterAuthObserver()
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }
  return compose(
    withRouter,
    connect()
  )(AuthListener)
}
