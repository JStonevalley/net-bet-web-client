import {combineReducers} from 'redux'
import {createSelector} from 'reselect'
import {Map, List} from 'immutable'
import {Game} from './types'
import * as actions from './actions'

const fixtures = (state = Map(), action) => {
  switch (action.type) {
    case actions.SCHEDULE_LOADED: return state.set(action.leagueId, action.fixtures)
    default: return state
  }
}

const fixturesSelector = (state) => state.publicContent.fixtures

const teams = (state = Map(), action) => {
  switch (action.type) {
    case actions.TEAMS_LOADED: return state.set(action.leagueId, action.teams)
    default: return state
  }
}

const teamsSelector = (state) => state.publicContent.teams

export const gamesInLeagueSelector = createSelector(
  [fixturesSelector, teamsSelector, (_, {leagueId}) => leagueId],
  (fixtures, teams, leagueId) => {
    fixtures = fixtures.get(leagueId)
    teams = teams.get(leagueId)
    return fixtures && teams
      ? List(fixtures.map(
        (fixture) => new Game(fixture, teams.get(fixture.homeTeamId), teams.get(fixture.awayTeamId))
      ).valueSeq())
      : List()
  }
)

export default combineReducers({
  fixtures,
  teams
})
