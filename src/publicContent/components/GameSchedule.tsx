import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import {List} from 'immutable'
import Typography from 'material-ui/Typography'
import Card from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper'
import {Fixture, Game} from '../types'
import {State} from '../../'
import {loadSchedule} from '../actions'
import {DateTime} from 'luxon'
import {Place1x2Bet} from '../../betting/components/1x2'
import {Credit} from '../../betting/types'

interface GameSummaryCardProps {
  game: Game
  signedIn?: Boolean
  style?: object
}

const GameSummaryCard = ({game, signedIn, style = {}}: GameSummaryCardProps) => {
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
        <Place1x2Bet
          game={game}
          signedIn={signedIn}
          maxBet={new Credit(10)}
        />
      </div>
    </Card>
  )
}

export type GameScheduleVersion = 'full' | 'played' | 'scheduled' | undefined
interface Props {
  leagueId: number,
  version: GameScheduleVersion
}

interface StateProps {
  games: List<Game>
  signedIn?: Boolean
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
    const {games = List<Game>(), version = 'full', signedIn} = this.props
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
              signedIn={signedIn}
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
      signedIn: state.user.signedIn === true,
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