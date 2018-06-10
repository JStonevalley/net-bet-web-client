import {auth} from 'firebase'

export const SIGNED_UP = 'SIGNED_UP'

export const signedUp = (user) => {
  return {
    type: SIGNED_UP,
    user
  }
}

export const LOG_OUT = 'LOG_OUT'

export const logout = () => {
  return (dispatch) => {
    auth().signOut()
    .then(() => {
      dispatch({
        type: LOG_OUT
      })
    })
  }
}

export const AUTH_LOADED = 'AUTH_LOADED'
