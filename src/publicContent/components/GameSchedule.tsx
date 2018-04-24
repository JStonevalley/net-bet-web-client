import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import {List} from 'immutable'
import Typography from 'material-ui/Typography'
import Card from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import {Fixture, Game} from '../types'
import {State} from '../../'
import {loadSchedule} from '../actions'
import {DateTime} from 'luxon'

interface GameSummaryCardProps {
  game: Game,
  style?: object
}

const GameSummaryCard = ({game, style = {}}: GameSummaryCardProps) => {
  return (
    <Card style={{display: 'flex', flexDirection: 'column', padding: '1rem', ...style}}>
      <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
        <Avatar src={game.homeTeam.crestUrl} />
        <Avatar src={game.awayTeam.crestUrl} />
      </div>
      <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
        <Typography variant='subheading' align='center' style={{flexBasis: '40%'}}>
          {game.homeTeam.name}
        </Typography>
        <Typography variant='subheading' align='center' style={{flexBasis: '40%'}}>
          {game.awayTeam.name}
        </Typography>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
        <Typography variant='title' align='center'>
          {game.result.fullTime.get(game.homeTeam.id)}
        </Typography>
        <Typography variant='title' align='center'>
          {game.result.fullTime.get(game.awayTeam.id)}
        </Typography>
      </div>
    </Card>
  )
}

interface Props {
  leagueId: number,
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
  }
  render () {
    const {games = List<Game>()} = this.props
    games.map((game: Game) => console.log(
      game.result.fullTime.toJS(),
      game.homeTeam.id,
      typeof game.homeTeam.id,
      game.result.fullTime.get(game.homeTeam.id)))
    return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {games.map((game: Game) => (
          <GameSummaryCard
            key={game.id}
            game={game}
            style={{flex: '1 0 15rem', margin: '1rem'}}
          />
        ))}
      </div>
    )
  }
}

export const GameSchedule = connect<StateProps, DispatchProp, Props>(
  (state: State, {leagueId}: Props) => {
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
        (a: DateTime, b: DateTime) => b.diff(a, 'millisecond').milliseconds
      ).toList()
    }
  }
)(GameSchedulePresentation)