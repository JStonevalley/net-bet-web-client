import * as React from 'react'
import {withStateHandlers} from 'recompose'
import Typography from '@material-ui/core/Typography'
import {Selection1x2} from './1x2Selection'
import {AmountSelection} from './AmountSelection'
import {Credit} from '../types'

const Place1x2BetPresentation = (
  {
    game,
    style,
    currentBet,
    teamSelection,
    increaseBet,
    decreaseBet,
    selectTeam
  }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        ...style
      }}
    >
      <Typography variant='title' align='center'>
        Place bet
      </Typography>
      <Selection1x2
        game={game}
        value={teamSelection}
        onChange={selectTeam}
        style={{marginBottom: '1rem'}}
      />
      <AmountSelection
        increaseBet={increaseBet}
        decreaseBet={decreaseBet}
        currentBet={currentBet}
        teamSelection={teamSelection}
      />
    </div>
  )
}

export const Place1x2Bet = withStateHandlers(
  {
    currentBet: new Credit(0),
    teamSelection: undefined
  },
  {
    increaseBet: ({currentBet}, {maxBet}) => () => {
      return currentBet.equals(maxBet)
        ? {
          currentBet
        }
        : {
          currentBet: currentBet.add(new Credit(1))
        }
    },
    decreaseBet: ({currentBet}) => () => {
      return currentBet.equals(new Credit(0))
        ? {
          currentBet
        }
        : {
          currentBet: currentBet.subtract(new Credit(1))
        }
    },
    selectTeam: () => (teamSelection) => {
      return {teamSelection}
    }
  }
)(Place1x2BetPresentation)
