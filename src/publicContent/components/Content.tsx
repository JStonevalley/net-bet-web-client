import * as React from 'react'
import {GameSchedule, GameScheduleVersion} from './GameSchedule'
import {Route, RouteComponentProps} from 'react-router-dom'

export const Content = ({match}: RouteComponentProps<{version: GameScheduleVersion}>) => {
  return (
    <div>
      <Route
        path={`${match.url}games/:version?`}
        render={({match: {params: {version}}}: RouteComponentProps<{version: GameScheduleVersion}>) => <GameSchedule
          leagueId={445}
          version={version}
        />}
      />
    </div>
  )
}