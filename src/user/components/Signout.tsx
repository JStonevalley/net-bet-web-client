import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import {compose, branch, renderNothing} from 'recompose'
import {logout, Logout} from '../actions'
import {Button} from 'material-ui'
import {User} from 'firebase'
import {State} from '../../combineReducers'

interface Props {
  user: User,
  dispatch: Dispatch<Logout>,
  children?: React.ReactNode
}

export const Signout = compose(
  connect((state: State) => ({
    user: state.user.user
  })),
  branch(
    ({user}) => !user,
    renderNothing
  )
)(({user, dispatch}: Props) => {
  return (
    <Button color='inherit' onClick={() => dispatch(logout())}>
      Log out {user.displayName}
    </Button>
  )
})
