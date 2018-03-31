import {combineReducers} from 'redux'
import userState, {UserState} from './user/reducer'

export interface State {
  user: UserState
}

export default combineReducers<State>({
  user: userState
})
