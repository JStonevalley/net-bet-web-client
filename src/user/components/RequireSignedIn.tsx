import * as React from 'react'
import {match as Match, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {State} from '../../combineReducers'

interface Props {
  match: Match<any>,
  signedIn: Boolean | null
}

export const RequireSignedIn = connect((state: State) => ({signedIn: state.user.signedIn}))
(({match, signedIn}: Props) => {
  return signedIn === false && match.url !== '/signin'
    ? <Redirect to='/signin' />
    : null
})