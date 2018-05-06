import * as React from 'react'
import {withStateHandlers, StateHandlerMap, StateHandler} from 'recompose'
import Icon from 'material-ui/Icon'
import Button from 'material-ui/Button'
import {Link} from 'react-router-dom'
import {Credit} from '../types'
import {Game} from '../../publicContent/types'
import {Selection1x2} from './1x2Selection'

interface Place1x2BetProps {
  game: Game
  signedIn?: Boolean
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
    signedIn,
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
  if (!signedIn) {
    return (
      <Link to='/signin' style={{textDecoration: 'none', alignSelf: 'center'}}>
        <Button color='primary'>Place bet</Button>
      </Link>
    )
  }
  return (
    <div
      style={{
        display: 'flex',
        borderTop: 'thin solid gray',
        paddingTop: '1rem',
        flexDirection: 'column',
        ...style
      }}
    >
      <Selection1x2 
        value={selection1x2Value}
        onChange={selectTeam}
      />   
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Button
          variant='fab'
          color='secondary'
          onClick={decreaseBet}
          style={{flex: '0 0 56px'}}
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
          style={{flex: '0 0 56px'}}
        >
          <Icon>add_icon</Icon>
        </Button>
      </div>
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
