import React from 'react'
import {connect} from 'react-redux'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'
import {compose, lifecycle} from 'recompose'
import {signedUp} from '../actions'
import {Route} from 'react-router-dom'

// Configure Firebase.
const config = {
  apiKey: 'AIzaSyC-jqrOvnbrL-sXdD7dcVo515Y9B9cUcwY',
  authDomain: 'net-bet-cloud.firebaseapp.com',
  databaseURL: 'https://net-bet-cloud.firebaseio.com',
  projectId: 'net-bet-cloud',
  storageBucket: 'net-bet-cloud.appspot.com',
  messagingSenderId: '624563572168'
}

firebase.initializeApp(config)

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'redirect',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
}

export const Signin = compose(
  connect((state) => ({
    loggedIn: Boolean(state.user.user)
  })),
  lifecycle({
    componentDidMount () {
      this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => {
          this.props.dispatch(signedUp(user))
        }
      )
    },
    componentWillUnmount () {
      this.unregisterAuthObserver()
    }
  })
)(({loggedIn}) => <Route
  path='/signin'
  render={() => !loggedIn && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />}
/>
)

