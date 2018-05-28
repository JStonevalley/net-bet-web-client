import * as React from 'react'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import {Bet} from '../../betting/types'

interface Props {
  toggleToChange: () => void
  currentBet?: Bet
}

export const CurrentBetDisplay = ({
  toggleToChange,
  currentBet,
}: Props) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Typography variant='title'>
        {currentBet ? 'Your current bet' : 'Betting'}
      </Typography>
      {currentBet && <Typography variant='subheading'>
        {currentBet.credits}
      </Typography>}
      <Button color='primary' onClick={toggleToChange}>
        {currentBet ? 'Change' : 'Place bet'}
      </Button>
    </div>
  )
}
