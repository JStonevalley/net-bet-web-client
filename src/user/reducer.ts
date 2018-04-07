import {combineReducers} from 'redux'
import {User} from './types'
import * as actions from './actions'

export interface UserState {
  user: User
  signedIn: Boolean | null
}

const user = (state: User | null = null, action: actions.SignedUp) => {
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