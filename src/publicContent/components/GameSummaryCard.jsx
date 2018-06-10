import * as React from 'react'
import {withState, compose} from 'recompose'
import {connect} from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import {DateTime} from 'luxon'
import {Place1x2Bet} from '../../betting/components/1x2'
import {Credit} from '../../betting/types'
import {CurrentBetDisplay} from './CurrentBetDisplay'

const GameSummaryCardPresentation = ({
  game,
  currentBet,
  style = {},
  placeBetOpen,
  setPlaceBetOpen
}) => {
  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column'
  }

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    justifyContent: 'space-between',
    ...style
  }
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

export const GameSummaryCard = compose(
  withState('placeBetOpen', 'setPlaceBetOpen', false),
  connect(
    (state, {game}) => ({
      currentBet: state.betting.bets.find((bet) => (bet && bet.fixtureId) === game.id)
    })
  )
)(GameSummaryCardPresentation)
