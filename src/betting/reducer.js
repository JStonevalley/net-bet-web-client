import {combineReducers} from 'redux'
import * as actions from './actions'
import {Map} from 'immutable'

const bets = (state = Map(), {type, bets}) => {
  switch (type) {
    case actions.BETS_LOADED: return state.merge(bets)
    default: return state
  }
}

const credits = (state = 0, {type, credits}) => {
  switch(type) {
    case actions.AVAILABLE_CREDITS_LOADED: return credits
    default: return state
  }
}

export default combineReducers({
  bets,
  credits
})
