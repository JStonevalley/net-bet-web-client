import * as React from 'react'
import {GameSchedule} from './GameSchedule'

export const PublicContent = () => {
  return (
    <div>
      <GameSchedule leagueId={445} />
    </div>
  )
}