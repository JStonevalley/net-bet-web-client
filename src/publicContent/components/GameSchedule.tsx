import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import {List} from 'immutable'
import {Game} from '../types'
import {State} from '../../'
import {loadSchedule} from '../actions'

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
    return (
      <div>
        {games.map((game: Game) => <p key={game._links.self.href}>{game.homeTeamName} - {game.awayTeamName}</p>)}
      </div>
    )
  }
}

export const GameSchedule = connect<StateProps, DispatchProp, Props>(
  (state: State) => ({
    games: state.publicContent.games.get(445)
  })
)(GameSchedulePresentation)