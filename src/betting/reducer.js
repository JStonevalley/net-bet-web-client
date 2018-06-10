import {combineReducers} from 'redux'
import * as actions from './actions'
import {Map} from 'immutable'

const bets = (state = Map(), action) => {
  switch (action.type) {
    case actions.BETS_LOADED: return state.merge(action.bets)
    default: return state
  }
}

export default combineReducers({
  bets
})
