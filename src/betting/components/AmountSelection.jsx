import * as React from 'react'
import Button from '@material-ui/core/Button'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import {connect} from 'react-redux'

export const AmountSelection = connect()(({
  input: {value, onChange},
  maxBet = 10
}) => {
  return <div
    style={{
      display: 'flex',
      justifyContent: 'space-between'
    }}
  >
    <Button
      type='button'
      variant='fab'
      color='secondary'
      onClick={() => onChange(Math.max(value - 1, 1))}
      style={{flex: '0 0 56px'}}
    >
      <RemoveIcon />
    </Button>
    <Button
      type='submit'
      variant='flat'
      color='primary'
      style={{margin: '0 0.5rem'}}
    >
      Bet {value} credits
    </Button>
    <Button
      type='button'
      variant='fab'
      color='primary'
      onClick={() => onChange(Math.min(value + 1, maxBet))}
      style={{flex: '0 0 56px'}}
    >
      <AddIcon />
    </Button>
  </div>
})
