/* global fetch */
import {Dispatch} from 'redux'
import {Fixture, Team} from './types'
import {List, Map} from 'immutable'
import {mapFromProperty} from '../shared/dataTools'
import {makeRequest, getFixturesUrl, getTeamsUrl} from '../shared/footballApi'

export const TEAMS_LOADED = 'TEAMS_LOADED'

export interface TeamsLoaded {
  readonly type: typeof TEAMS_LOADED
  readonly leagueId: number,
  readonly teams: List<Team>
}

export const loadTeams = (leagueId: number) => {
  return async (dispatch: Dispatch<any>) => {
    const response = await makeRequest(getTeamsUrl(leagueId))
    const teams = List(response.teams as Team[])
    const teamsMap = mapFromProperty<number, Team>(teams, 'id')
    dispatch({
      type: TEAMS_LOADED,
      leagueId,
      teams: teamsMap
    })
  }
}

export const SCHEDULE_LOADED = 'SCHEDULE_LOADED'

export interface ScheduleLoaded {
  readonly type: typeof SCHEDULE_LOADED
  readonly leagueId: number,
  readonly fixtures: Map<number, Fixture>
}

export const loadSchedule = (leagueId: number) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(loadTeams(leagueId))
    const response = await makeRequest(getFixturesUrl(leagueId))
    const fixtures = List(response.fixtures as Fixture[])
    const fixturesMap = mapFromProperty<number, Fixture>(fixtures, 'id')
    dispatch({
      type: SCHEDULE_LOADED,
      leagueId,
      fixtures: fixturesMap
    })
  }
}
