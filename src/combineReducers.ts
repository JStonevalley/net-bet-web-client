import {combineReducers} from 'redux'
import userState, {UserState} from './user/reducer'
import {reducer as formReducer, FormReducer} from 'redux-form'

export interface State {
  user: UserState,
  form: FormReducer
}

export default combineReducers<State>({
  user: userState,
  form: formReducer
})
