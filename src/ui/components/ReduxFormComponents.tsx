import * as React from 'react'
import TextField from 'material-ui/TextField'

export const ReduxTextField = ({input, meta, ...custom}: any) => {
  return (
    <TextField
      error={meta && meta.touched && meta.error}
      helperText={meta && meta.touched && meta.error}
      {...input}
      {...custom}
    />
  )
}
