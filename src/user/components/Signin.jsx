import React from 'react'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import {connect} from 'react-redux'

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  // signInSuccessUrl: '/home',
  // We will display Google as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
}

export const Signin = connect((state) => ({
  signedIn: state.user.signedIn
}))(({signedIn}) => {
  return signedIn === false && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
})
