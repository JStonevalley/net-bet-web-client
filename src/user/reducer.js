import {combineReducers} from 'redux'
import * as actions from './actions'

const user = (state = null, action) => {
  switch (action.type) {
    case actions.SIGNED_UP: return action.user
    default: return state
  }
}

const signedIn = (state = false, action) => {
  switch (action.type) {
    case actions.SIGNED_UP: return Boolean(action.user)
    default: return state
  }
}

const authLoaded = (state = false, action) => {
  switch (action.type) {
    case actions.SIGNED_UP: return true
    case actions.AUTH_LOADED: return true
    default: return state
  }
}

export default combineReducers({
  user,
  signedIn,
  authLoaded
})
