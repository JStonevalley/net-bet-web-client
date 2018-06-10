/* global fetch */
import {List} from 'immutable'
import {mapFromProperty} from '../shared/dataTools'
import {makeRequest, getFixturesUrl, getTeamsUrl} from '../shared/footballApi'

export const TEAMS_LOADED = 'TEAMS_LOADED'

export const loadTeams = (leagueId) => {
  return async (dispatch) => {
    const response = await makeRequest(getTeamsUrl(leagueId))
    const teams = List(response.teams)
    const teamsMap = mapFromProperty(teams, 'id')
    dispatch({
      type: TEAMS_LOADED,
      leagueId,
      teams: teamsMap
    })
  }
}

export const SCHEDULE_LOADED = 'SCHEDULE_LOADED'

export const loadSchedule = (leagueId) => {
  return async (dispatch) => {
    dispatch(loadTeams(leagueId))
    const response = await makeRequest(getFixturesUrl(leagueId))
    const fixtures = List(response.fixtures)
    const fixturesMap = mapFromProperty(fixtures, 'id')
    dispatch({
      type: SCHEDULE_LOADED,
      leagueId,
      fixtures: fixturesMap
    })
  }
}
