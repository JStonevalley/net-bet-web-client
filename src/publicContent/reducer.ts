import {combineReducers} from 'redux'
import {Game} from './types'
import {Map, List} from 'immutable'
import * as actions from './actions'

export interface PublicContentState {
  games: Map<number, List<Game>>
}

const games = (state: Map<number, List<Game>> = Map<number, List<Game>>(), action: actions.ScheduleLoaded) => {
  switch (action.type) {
    case actions.SCHEDULE_LOADED: return state.set(action.leagueId, action.games)
    default: return state
  }
}

export default combineReducers<PublicContentState>({
  games
})