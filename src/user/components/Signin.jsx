import React from 'react'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import {connect} from 'react-redux'
import {compose} from 'recompose'
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
  signInSuccessUrl: '/home',
  // We will display Google as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
}

export const Signin = compose(
  connect((state) => ({
    signedIn: state.user.signedIn
  }))
)(({signedIn, match}) => <Route
  path='/signin'
  render={() => signedIn === false && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />}
/>
)

