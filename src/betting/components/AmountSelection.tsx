import * as React from 'react'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import {Credit} from '../types'

interface SelectionProps {
  increaseBet: () => void
  decreaseBet: () => void
  currentBet: Credit,
  teamSelection: number | null | undefined
  style?: object
}

export const AmountSelection = ({
  increaseBet,
  decreaseBet,
  currentBet,
  style,
  teamSelection
}: SelectionProps) => {
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
}