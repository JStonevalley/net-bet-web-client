import {Dispatch} from 'redux'
import {User, auth} from 'firebase'

export const SIGNED_UP = 'SIGNED_UP'

export interface SignedUp {
  type: typeof SIGNED_UP
  user: User | null
}

export const signedUp = (user: User | null) => {
  return (dispatch: Dispatch<SignedUp>) => {
    dispatch({
      type: SIGNED_UP,
      user
    })
  }
}

export const LOG_OUT = 'LOG_OUT'

export interface Logout {
  type: typeof LOG_OUT
}

export const logout = () => {
  return (dispatch: Dispatch<Logout>) => {
    auth().signOut()
    .then(() => {
      dispatch({
        type: LOG_OUT
      })
    })
  }
}