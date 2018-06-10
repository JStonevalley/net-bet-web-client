import * as React from 'react'
import TextField from '@material-ui/core/TextField'

export const ReduxTextField = ({input, meta, ...custom}) => {
  return (
    <TextField
      error={meta && meta.touched && meta.error}
      helperText={meta && meta.touched && meta.error}
      {...input}
      {...custom}
    />
  )
}
