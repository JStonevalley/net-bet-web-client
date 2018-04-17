import {combineReducers} from 'redux'
import userState, {UserState} from './user/reducer'
import publicContentState, {PublicContentState} from './publicContent/reducer'
import {reducer as formReducer, FormReducer} from 'redux-form'

export interface State {
  user: UserState,
  publicContent: PublicContentState, 
  form: FormReducer
}

export default combineReducers<State>({
  user: userState,
  publicContent: publicContentState,
  form: formReducer
})
