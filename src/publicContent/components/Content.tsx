import * as React from 'react'
import {GameSchedule, GameScheduleVersion} from './GameSchedule'
import {RouteComponentProps} from 'react-router-dom'
import {PrivateRoute} from '../../PrivateRoute'

const GameScheduleWrapper = ({match: {params: {version}}}: 
  RouteComponentProps<{version: GameScheduleVersion}>) => {
  return (
    <GameSchedule
      leagueId={445}
      version={version}
    />
  )
}

export const Content = ({match}: RouteComponentProps<{version: GameScheduleVersion}>) => {
  return (
    <div>
      <PrivateRoute
        path={`${match.url}games/:version?`}
        component={GameScheduleWrapper}
      />
    </div>
  )
}
