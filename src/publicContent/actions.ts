/* global fetch */
import {Dispatch} from 'redux'
import {Game} from './types'
import {List} from 'immutable'
import {makeRequest, getFixturesUrl} from '../shared/footballApi'

export const SCHEDULE_LOADED = 'SCHEDULE_LOADED'

export interface ScheduleLoaded {
  readonly type: typeof SCHEDULE_LOADED
  readonly leagueId: number,
  readonly games: List<Game>
}

export const loadSchedule = (leagueId: number) => {
  return async (dispatch: Dispatch<ScheduleLoaded>) => {
    const response = await makeRequest(getFixturesUrl(leagueId))
    dispatch({
      type: SCHEDULE_LOADED,
      leagueId,
      games: List(response.fixtures as Game[])
    })
  }
}