import {combineReducers} from 'redux'
import {Map} from 'immutable'
import * as actions from './actions'

const fixtures = (state = Map(), action) => {
  switch (action.type) {
    case actions.SCHEDULE_LOADED: return state.set(action.leagueId, action.fixtures)
    default: return state
  }
}

const teams = (state = Map(), action) => {
  switch (action.type) {
    case actions.TEAMS_LOADED: return state.set(action.leagueId, action.teams)
    default: return state
  }
}

export default combineReducers({
  fixtures,
  teams
})
