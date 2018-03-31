import {combineReducers} from 'redux'
import {User} from './types'
import * as actions from './actions'

export interface UserState {
  user: User
}

const defaultState = () => ({id: 'hejsan', firstName: 'Jonas', lastName: 'Stendahl'})

const user = (state: User | null = defaultState(), action: actions.SignUpAction) => {
  switch (action.type) {
    case actions.SIGN_UP_LOADING: return null
    case actions.SIGN_UP_SUCCESS: return action.user
    default: return state
  }
}

export default combineReducers<UserState>({
  user
})