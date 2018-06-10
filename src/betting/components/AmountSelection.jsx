import * as React from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import {connect} from 'react-redux'
import {placeBet} from '../actions'

export const AmountSelection = connect()(({
  increaseBet,
  decreaseBet,
  currentBet,
  style,
  teamSelection,
  dispatch
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <Button
        variant='fab'
        color='secondary'
        disabled={teamSelection === undefined}
        onClick={decreaseBet}
        style={{flex: '0 0 56px'}}
      >
        <Icon>remove_icon</Icon>
      </Button>
      <Button
        variant='flat'
        color='primary'
        onClick={() => dispatch(placeBet({
          credits: currentBet.amount
        }))}
        disabled={(currentBet.amount === 0) || (teamSelection === undefined)}
        style={{margin: '0 0.5rem'}}
      >
        Bet {currentBet.amount} credits
      </Button>
      <Button
        variant='fab'
        color='primary'
        disabled={teamSelection === undefined}
        onClick={increaseBet}
        style={{flex: '0 0 56px'}}
      >
        <Icon>add_icon</Icon>
      </Button>
    </div>
  )
})
