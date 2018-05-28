import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import {List} from 'immutable'
import {DateTime} from 'luxon'
import Typography from 'material-ui/Typography'
import {Fixture, Game} from '../types'
import {State} from '../../'
import {loadSchedule} from '../actions'
import {loadBets} from '../../betting/actions'
import {GameSummaryCard} from './GameSummaryCard'

export type GameScheduleVersion = 'full' | 'played' | 'scheduled' | undefined
interface Props {
  leagueId: number,
  version: GameScheduleVersion
}

interface StateProps {
  games: List<Game>
}

interface DispatchProp {
  dispatch: Dispatch<any>
}

class GameSchedulePresentation extends React.Component<Props & StateProps & DispatchProp> {
  componentDidMount () {
    const {leagueId, dispatch} = this.props
    dispatch(loadSchedule(leagueId))
    dispatch(loadBets())
  }
  render () {
    const {games = List<Game>(), version = 'full'} = this.props
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
          {games.map((game: Game) => (
            <GameSummaryCard
              key={game.id}
              game={game}
              style={{flex: '1 0 15rem', margin: '0.5rem'}}
            />
          ))}
        </div>
      </div>
    )
  }
}

export const GameSchedule = connect<StateProps, DispatchProp, Props>(
  (state: State, {leagueId, version = 'full'}: Props) => {
    const gameFilter = version === 'played'
      ? (game: Game) => game.isPlayed()
      : version === 'scheduled'
        ? (game: Game) => !game.isPlayed()
        : () => true
    const fixtures = state.publicContent.fixtures.get(leagueId)
    const teams = state.publicContent.teams.get(leagueId)
    const games =  fixtures && teams
      ? List(fixtures.map<Game>(
        (fixture: Fixture) => new Game(fixture, teams.get(fixture.homeTeamId), teams.get(fixture.awayTeamId))
      ).valueSeq())
      : List<Game>()
    return {
      games: games.sortBy(
        (game: Game) => game.date,
        (a: DateTime, b: DateTime) => version === 'scheduled'
          ? a.diff(b, 'millisecond').milliseconds
          : b.diff(a, 'millisecond').milliseconds
      )
      .filter(gameFilter)
      .toList()
    }
  }
)(GameSchedulePresentation)