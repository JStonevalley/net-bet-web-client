import {combineReducers} from 'redux'
import {UserInfo} from 'firebase'
import * as actions from './actions'

export interface UserState {
  user: UserInfo
  signedIn: Boolean | null
}

const user = (state: UserInfo | null = null, action: actions.SignedUp) => {
  switch (action.type) {
    case actions.SIGNED_UP: return action.user
    default: return state
  }
}

const signedIn = (state: Boolean | null = null, action: actions.SignedUp) => {
  switch (action.type) {
    case actions.SIGNED_UP: return Boolean(action.user)
    default: return state
  }
}

export default combineReducers<UserState>({
  user,
  signedIn
})