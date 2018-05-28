import * as React from 'react'
import {withStateHandlers, StateHandlerMap, StateHandler} from 'recompose'
import Typography from 'material-ui/Typography'
import {Credit} from '../types'
import {Game} from '../../publicContent/types'
import {Selection1x2} from './1x2Selection'
import {AmountSelection} from './AmountSelection'

interface Place1x2BetProps {
  game: Game
  maxBet?: Credit
  style?: object
}

interface StateProps {
  currentBet: Credit,
  teamSelection: number | null | undefined
}

type StateHandlerProps = StateHandlerMap<StateProps> & {
  increaseBet(): StateHandler<StateProps>,
  decreaseBet(): StateHandler<StateProps>
  selectTeam(): StateHandler<StateProps>
}

type CompleteProps = Place1x2BetProps & StateProps & StateHandlerProps

const Place1x2BetPresentation = (
  {
    game,
    style,
    currentBet,
    teamSelection,
    increaseBet,
    decreaseBet,
    selectTeam
  }: CompleteProps) => {
  const selection1x2Value = teamSelection === game.homeTeam.id
    ? '1'
    : teamSelection === game.awayTeam.id
      ? '2'
      : teamSelection === null
        ? 'x'
        : undefined
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
        value={selection1x2Value}
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

export const Place1x2Bet = withStateHandlers<
  StateProps,
  StateHandlerProps,
  Place1x2BetProps
>(
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
    selectTeam: (_, {game}) => (selection) => {
      switch (selection) {
        case '1': return {teamSelection: game.homeTeam.id}
        case 'x': return {teamSelection: null}
        case '2': return {teamSelection: game.awayTeam.id}
        default: return {teamSelection: undefined}
      }
    }
  }
)(Place1x2BetPresentation)
