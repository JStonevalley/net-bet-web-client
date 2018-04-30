import * as React from 'react'
// import {connect, Dispatch} from 'react-redux'
import {withStateHandlers, StateHandlerMap, StateHandler} from 'recompose'
import {Game} from '../../publicContent/types'
import {Credit} from '../types'
import Icon from 'material-ui/Icon'
import Button from 'material-ui/Button'

interface Place1x2BetProps {
  game: Game,
  maxBet?: Credit
  style?: object,
}

interface StateProps {
  currentBet: Credit
}

type StateHandlerProps = StateHandlerMap<StateProps> & {
  increaseBet(): StateHandler<StateProps>,
  decreaseBet(): StateHandler<StateProps>
}

type CompleteProps = Place1x2BetProps & StateProps & StateHandlerProps

const Place1x2BetPresentation = ({game, style, currentBet, increaseBet, decreaseBet}: CompleteProps) => {
  return (
    <div
      style={{
        display: 'flex',
        borderTop: 'thin solid gray',
        padding: '1rem',
        justifyContent: 'space-between',
        ...style
      }}
    >
      <Button
        variant='fab'
        color='secondary'
        onClick={decreaseBet}
      >
        <Icon>remove_icon</Icon>
      </Button>
      <Button variant='flat' color='primary' style={{margin: '0 0.5rem'}}>
        Bet {currentBet.amount} credits
      </Button>
      <Button
        variant='fab'
        color='primary'
        onClick={increaseBet}
      >
        <Icon>add_icon</Icon>
      </Button>
    </div>
  )
}

export const Place1x2Bet = withStateHandlers<
  StateProps,
  StateHandlerProps,
  Place1x2BetProps
>(
  {
    currentBet: new Credit(0)
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
    }
  }
)(Place1x2BetPresentation)
