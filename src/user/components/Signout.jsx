import React from 'react'
import {connect} from 'react-redux'
import {compose, branch, renderNothing} from 'recompose'
import {logout} from '../actions'
import {Button} from 'material-ui'

export const Signout = compose(
  connect((state) => ({
    user: state.user.user
  })),
  branch(
    ({user}) => !user,
    renderNothing
  )
)(({user, dispatch}) => {
  return <Button color='inherit' onClick={() => dispatch(logout())}>
    Log out {user.displayName}
  </Button>
})
