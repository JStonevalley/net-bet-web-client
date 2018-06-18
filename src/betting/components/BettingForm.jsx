import * as React from 'react'
import {reduxForm, Field, formValueSelector} from 'redux-form'
import {connect} from 'react-redux'
import {compose} from 'recompose'
import {placeBet} from '../actions'
import {Bet} from '../types'
import {TeamSelection} from './TeamSelection'
import {AmountSelection} from './AmountSelection'
import Typography from '@material-ui/core/Typography'

export const BETTING_FORM_PREFIX = 'bettingForm-'

const BettingFormCore = compose(
  connect((state, {form}) => ({currentTeamIdSelection: formValueSelector(form)(state, 'teamId')})),
  reduxForm({})
)(({game, leagueId, style, maxBet, currentTeamIdSelection, dispatch, handleSubmit}) => {
  return <form
      onSubmit={handleSubmit(({teamId, credits}) => dispatch(placeBet(new Bet({credits, teamId, fixtureId: game.id, leagueId}))))}
      style={{
        display: 'flex',
        flexDirection: 'column',
        ...style
      }}
    >
      <Typography variant='title' align='center'>
        Place bet
      </Typography>
      <Field
        name='teamId'
        component={TeamSelection}
        game={game}
        style={{marginBottom: '1rem'}}
      />
      {currentTeamIdSelection !== undefined && <Field
        name='credits'
        component={AmountSelection}
        game={game}
        maxBet={maxBet}
        style={{marginBottom: '1rem'}}
      />}
  </form>
})

export const BettingForm = ({game, initialValues = {}, ...rest}) => <BettingFormCore
  form={`${BETTING_FORM_PREFIX}${game.id}`}
  game={game}
  initialValues={{credits: 1, ...initialValues}}
  {...rest}
/>