import * as React from 'react'
import {withState, compose} from 'recompose'
import {connect} from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import {DateTime} from 'luxon'
import {BettingForm} from '../../betting/components/BettingForm'
import {CurrentBetDisplay} from './CurrentBetDisplay'

const TeamDisplay = ({name, crest, style}) => {
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...style
  }}>
    <Paper style={{borderRadius: '50%'}}>
      <Avatar src={crest} style={{width: 56, height: 56}} />
    </Paper>
    <Typography variant='subheading' align='center' style={{flexBasis: '40%'}}>
      {name}
    </Typography>
  </div>
}

const GameDateAndTimeDisplay = ({game, style}) => {
  return <div style={style}>
    <Typography variant='subheading' align='center' color='textSecondary' >
      {game.date.setLocale('sv').toLocaleString(DateTime.DATE_MED)}
    </Typography>,
    <Typography variant='subheading' align='center' color='textSecondary' >
      {game.date.setLocale('sv').toLocaleString(DateTime.TIME_24_SIMPLE)}
    </Typography>
  </div>
}

const GameResultDisplay = ({game}) => {
  return <div>
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
  </div>
}

const teamDisplayStyle = {
  flex: '0 1 6rem'
}

const GameSummaryCardPresentation = ({
  leagueId,
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
          <TeamDisplay
            name={game.homeTeam.name}
            crest={game.homeTeam.crestUrl}
            style={teamDisplayStyle}
          />
          <TeamDisplay
            name={game.awayTeam.name}
            crest={game.awayTeam.crestUrl}
            style={teamDisplayStyle}
          />
        </div>
      </div>
      <div style={sectionStyle}>
        <GameDateAndTimeDisplay game={game} />
        <GameResultDisplay game={game} />
        {!game.isPlayed() && <Divider style={{margin: '1rem 0'}} />}
        {placeBetOpen
          ? <BettingForm
            game={game}
            leagueId={leagueId}
            maxBet={10}
          />
          : <CurrentBetDisplay
            game={game}
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
