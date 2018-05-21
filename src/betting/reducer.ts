import {combineReducers} from 'redux'
import * as actions from './actions'
import {Bet} from './types'
import {Map} from 'immutable'

export interface BettingState {
  bets: Map<string, Bet>
}

const bets = (state: Map<string, Bet> = Map<string, Bet>(), action: actions.BetsLoaded) => {
  switch (action.type) {
    case actions.BETS_LOADED: return state.merge(action.bets)
    default: return state
  }
}

export default combineReducers<BettingState>({
  bets
})