import * as React from 'react'
import {connect} from 'react-redux'
import {List} from 'immutable'
import Typography from '@material-ui/core/Typography'
import {loadSchedule} from '../actions'
import {gamesInLeagueSelector} from '../reducer'
import {loadBets} from '../../betting/actions'
import {GameSummaryCard} from './GameSummaryCard'

const cardSpacing = {
  flex: '1 0 15rem',
  margin: '0.5rem'
}

class GameSchedulePresentation extends React.Component {
  componentDidMount () {
    const {leagueId, dispatch} = this.props
    dispatch(loadSchedule(leagueId))
    dispatch(loadBets())
  }
  render () {
    const {games = List(), leagueId, version = 'full'} = this.props
    return (
      <div style={{padding: '1rem'}}>
        <Typography variant='headline'>
          {version === 'played'
            ? 'Played games'
            : version === 'scheduled'
              ? 'Scheduled games'
              : 'Games'
          }
        </Typography>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {games.map((game) => (
            <GameSummaryCard
              key={game.id}
              game={game}
              leagueId={leagueId}
              style={cardSpacing}
            />
          ))}
        </div>
      </div>
    )
  }
}

export const GameSchedule = connect(
  (state, {leagueId, version = 'full'}) => {
    const gameFilter = version === 'played'
      ? (game) => game.isPlayed()
      : version === 'scheduled'
        ? (game) => !game.isPlayed()
        : () => true
    const games = gamesInLeagueSelector(state, {leagueId})
    return {
      games: games.sortBy(
        (game) => game.date,
        (a, b) => version === 'scheduled'
          ? a.diff(b, 'millisecond').milliseconds
          : b.diff(a, 'millisecond').milliseconds
      )
      .filter(gameFilter)
      .toList()
    }
  }
)(GameSchedulePresentation)
