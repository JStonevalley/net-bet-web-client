import * as React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {reduxForm, InjectedFormProps, Field} from 'redux-form'
import {User} from '../types'
import {State} from '../../combineReducers'
import {ReduxTextField} from '../../ui'
import {required} from '../../shared/formValidation'

const FORM_NAME = 'SIGN_UP_FORM'

interface SignUpProps extends InjectedFormProps {
  user: User
}

let SignUp = ({user, handleSubmit}: SignUpProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name='email'
        component={ReduxTextField}
        validate={required}
        label='Email'
      />
    </form>
  )
}

export const ConnectedSignUp = compose(
  connect((state: State) => ({
    user: state.user.user
  })),
  reduxForm({
    form: FORM_NAME
  })
)(SignUp)
