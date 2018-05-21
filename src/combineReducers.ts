import {combineReducers} from 'redux'
import userState, {UserState} from './user/reducer'
import bettingState, {BettingState} from './betting/reducer'
import publicContentState, {PublicContentState} from './publicContent/reducer'
import {reducer as formReducer, FormReducer} from 'redux-form'

export interface State {
  user: UserState,
  publicContent: PublicContentState, 
  betting: BettingState,
  form: FormReducer
}

export default combineReducers<State>({
  user: userState,
  betting: bettingState,
  publicContent: publicContentState,
  form: formReducer
})
