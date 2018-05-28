import * as React from 'react'
import {withState, compose} from 'recompose'
import {connect, Dispatch} from 'react-redux'
import Typography from 'material-ui/Typography'
import Card from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import {DateTime} from 'luxon'
import {State} from '../../'
import {Game} from '../types'
import {Place1x2Bet} from '../../betting/components/1x2'
import {Credit, Bet} from '../../betting/types'
import {CurrentBetDisplay} from './CurrentBetDisplay'

interface Props {
  game: Game
  style?: object
}

interface StateProps {
  currentBet?: Bet
}

interface DispatchProp {
  dispatch: Dispatch<any>
}

interface LocalStateProps {
  placeBetOpen: boolean
  setPlaceBetOpen: (placeBetOpen: boolean) => void
}

const GameSummaryCardPresentation = ({
  game,
  currentBet,
  style = {},
  placeBetOpen,
  setPlaceBetOpen
}: Props & StateProps & DispatchProp & LocalStateProps) => {
  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column'
  } as React.StyleHTMLAttributes<any>

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    justifyContent: 'space-between',
    ...style
  } as React.StyleHTMLAttributes<any>
  return (
    <Card
      style={cardStyle}
    >
      <div style={sectionStyle}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '0 1 6rem'}}>
            <Paper style={{borderRadius: '50%'}}>
              <Avatar src={game.homeTeam.crestUrl} style={{width: 56, height: 56}} />
            </Paper>
            <Typography variant='subheading' align='center' style={{flexBasis: '40%'}}>
              {game.homeTeam.name}
            </Typography>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '0 1 6rem'}}>
            <Paper style={{borderRadius: '50%'}}>
              <Avatar src={game.awayTeam.crestUrl} style={{width: 56, height: 56}} />
            </Paper>
            <Typography variant='subheading' align='center' style={{flexBasis: '40%'}}>
              {game.awayTeam.name}
            </Typography>
          </div>
        </div>
      </div>
        <div style={sectionStyle}>
        <Typography variant='subheading' align='center' color='textSecondary' >
          {game.date.setLocale('sv').toLocaleString(DateTime.DATE_MED)}
        </Typography>
        <Typography variant='subheading' align='center' color='textSecondary' >
          {game.date.setLocale('sv').toLocaleString(DateTime.TIME_24_SIMPLE)}
        </Typography>
        {game.result.halfTime && <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
          <Typography variant='subheading' align='center' color='textSecondary' >
            ({game.result.halfTime.get(game.homeTeam.id)})
          </Typography>
          <Typography variant='subheading' align='center' color='textSecondary' >
            ({game.result.halfTime.get(game.awayTeam.id)})
          </Typography>
        </div>}
        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
          <Typography variant='title' align='center'>
            {game.result.fullTime.get(game.homeTeam.id)}
          </Typography>
          <Typography variant='title' align='center'>
            {game.result.fullTime.get(game.awayTeam.id)}
          </Typography>
        </div>
        <Divider style={{margin: '1rem 0'}} />
        {placeBetOpen
          ? <Place1x2Bet
            game={game}
            maxBet={new Credit(10)}
          />
          : <CurrentBetDisplay
            currentBet={currentBet}
            toggleToChange={() => setPlaceBetOpen(true)}
          />
        }
      </div>
    </Card>
  )
}

export const GameSummaryCard = compose<LocalStateProps & StateProps & DispatchProp, Props>(
  withState<LocalStateProps, boolean, 'placeBetOpen', 'setPlaceBetOpen'>('placeBetOpen', 'setPlaceBetOpen', false),
  connect<StateProps, DispatchProp, Props>(
    (state: State, {game}: Props) => ({
      currentBet: state.betting.bets.find((bet) => (bet && bet.fixtureId) === game.id)
    })
  )
)(GameSummaryCardPresentation)