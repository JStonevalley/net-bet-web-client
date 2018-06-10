import {combineReducers} from 'redux'
import userState from './user/reducer'
import bettingState from './betting/reducer'
import publicContentState from './publicContent/reducer'
import {reducer as formReducer} from 'redux-form'

export default combineReducers({
  user: userState,
  betting: bettingState,
  publicContent: publicContentState,
  form: formReducer
})
