import {combineReducers} from 'redux'
import {Fixture, Team} from './types'
import {Map, List} from 'immutable'
import * as actions from './actions'

export interface PublicContentState {
  fixtures: Map<number, Map<number, Fixture>>,
  teams: Map<number, Map<number, Team>>
}

const fixtures = (state: Map<number, Map<number, Fixture>> = Map<number, Map<number, Fixture>>(),
                  action: actions.ScheduleLoaded
) => {
  switch (action.type) {
    case actions.SCHEDULE_LOADED: return state.set(action.leagueId, action.fixtures)
    default: return state
  }
}

const teams = (state: Map<number, List<Team>> = Map<number, List<Team>>(), action: actions.TeamsLoaded) => {
  switch (action.type) {
    case actions.TEAMS_LOADED: return state.set(action.leagueId, action.teams)
    default: return state
  }
}

export default combineReducers<PublicContentState>({
  fixtures,
  teams
})