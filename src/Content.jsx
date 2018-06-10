import * as React from 'react'
import {GameSchedule} from './publicContent/components/GameSchedule'
import {withRouterParams} from './shared'
import {PrivateRoute} from './PrivateRoute'

export const Content = ({match}) => {
  return (
    <div>
      <PrivateRoute
        path='/games/:leagueId/:version?'
        component={withRouterParams(GameSchedule)}
      />
    </div>
  )
}
